# CodeBin - Secure Code Snippet Storage

CodeBin is a web application built with Angular, Angular Material, NgRx, RxJS, and Firebase. It allows users to securely store and edit their code snippets in the cloud.

## Features

- **Secure Storage**: Store your code snippets securely in the cloud using Firebase Authentication.
- **Edit Code Snippets**: Easily edit your code snippets directly in the browser.
- **GitHub and Google Authentication**: Sign in to CodeBin using your GitHub or Google account.
- **Passwordless Email Authentication**: Sign in with your email by clicking a magic link sent to your inbox.
- **Password Reset**: Reset your password easily if you forget it.
- **Responsive Design**: Enjoy a seamless experience across various devices and screen sizes.

## Getting Started

To get started with CodeBin, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   cd codebin
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project in the Firebase console.
   - Enable Authentication and Firestore in your Firebase project.
   - Copy your Firebase configuration and replace it in the `environments` files (`environment.ts` and `environment.prod.ts`) of your Angular project.

4. Run the development server:

   ```bash
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200/` to view CodeBin.

## Demo

Watch this [YouTube video](#) to see a demonstration of CodeBin in action.

## Website

Access CodeBin at [Codebin](https://causewaylogin.vercel.app/).

## Architecture

The authentication service (`AuthService`) manages user authentication using Firebase Authentication. Below is an overview of the key functions:

<details>
<summary><b>signInWithGithub()</b></summary>

Sign in with a GitHub account using Firebase's GitHub provider.

```typescript
signInWithGithub() {
    const auth = getAuth();
    signInWithPopup(auth, new GithubAuthProvider())
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result)!;
            const token = credential.accessToken;
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });
}
```

</details>

<details>
<summary><b>signInWithGoogle()</b></summary>

Sign in with a Google account using Firebase's Google provider.

```typescript
signInWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
            this.router.navigate(['/snippet']);
            const credential = GoogleAuthProvider.credentialFromResult(result)!;
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            // IdP data available using getAdditionalUserInfo(result)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
        });
}
```

</details>

<details>
<summary><b>signInWithEmailLinkAuth(email: string, path: string = '/loading')</b></summary>

Send a sign-in email link to the user's email address. The user clicks the link to sign in to the application.

```typescript
signInWithEmailLinkAuth(email: string, path: string = '/loading') {
    const auth = getAuth();
    const actionCodeSettings: ActionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: location.origin + this.location.prepareExternalUrl(path),
        // This must be true.
        handleCodeInApp: true,
    }
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
            // The link was successfully sent. Inform the user.
            // Save the email locally so you don't need to ask the user for it again
            // if they open the link on the same device.
            window.localStorage.setItem('emailForSignIn', email);
            this.dialog.open(LinksendComponent)
            console.log('email sent');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            // ...
        });
}
```

</details>

<details>
<summary><b>confirmSignIn(url: string)</b></summary>

Confirm the sign-in link sent via email and sign the user into the application.

```typescript
confirmSignIn(url: string) {
    // Confirm the link is a sign-in with email link.
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem('emailForSignIn')!;
        // The client SDK will parse the

 code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
            .then((result) => {
                // Clear email from storage.
                window.localStorage.removeItem('emailForSignIn');
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
                this.router.navigate(['/snippet']);
                console.log(result);
            })
            .catch((error) => {
                // Some error occurred, you can inspect the code: error.code
                // Common errors could be invalid email and invalid or expired OTPs.
                console.log(error);
                this.router.navigate(['/']);
            });
    }
}
```

</details>

<details>
<summary><b>registerUser(email: string, password: string)</b></summary>

Register a new user with email and password.

```typescript
registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            this.dialog.open(SucesspopComponent);
            this.router.navigate(['/snippet']);
        })
        .catch((error) => {
            const errorMessage = error.message;
            if (error.code === 'auth/email-already-in-use') {
                this.dialog.open(EmailAlreadyexistComponent);
            } else {
                this.dialog.open(InvalidEmailComponent);
            }
        });
}
```

</details>

<details>
<summary><b>loginUser(email: string, password: string)</b></summary>

Log in an existing user with email and password.

```typescript
loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            this.router.navigate(['/snippet']);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            this.dialog.open(InvalidemailpasswordComponent);
        });
}
```

</details>

<details>
<summary><b>`logout()`</b></summary>

Log out the current user.

```typescript
logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        this.uid = undefined;
        this.router.navigate(['/']);
    }).catch((error) => {
        console.log('Error occurred during signout:', error);
    });
}
```

</details>

<details>
<summary><b>resetPassword(email: string)</b></summary>

Send a password reset email to the user's email address.

```typescript
resetPassword(email: string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            this.dialog.open(LinksendComponent);
        })
        .catch((error) => {
            console.log('Error occurred during password reset:', error);
            this.dialog.open(LinksendComponent);
        });
}
```

</details>

<details>
<summary><b>getCurrentUser()</b></summary>

Get the current authenticated user.

```typescript
getCurrentUser() {
    return getAuth().currentUser;
}
```

</details>

Feel free to expand and customize the README further with additional information about your project. Include screenshots or GIFs to provide visual explanations of your website's features.

--- 

This README file provides detailed information about your project, including its features, how to get started, and an overview of the architecture with code snippets explained using expansion panels. Adjustments can be made as needed to suit your project's specific requirements.