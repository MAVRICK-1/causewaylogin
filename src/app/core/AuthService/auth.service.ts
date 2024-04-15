import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionCodeSettings, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, isSignInWithEmailLink, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup, signOut } from 'firebase/auth';
import { EmailAlreadyexistComponent } from '../../Shared/popups/email-alreadyexist/email-alreadyexist.component';
import { InvalidEmailComponent } from '../../Shared/popups/invalid-email/invalid-email.component';
import { InvalidemailpasswordComponent } from '../../Shared/popups/invalidemailpassword/invalidemailpassword.component';
import { LinksendComponent } from '../../Shared/popups/linksend/linksend.component';
import { SucesspopComponent } from '../../Shared/popups/sucesspop/sucesspop.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid?: string;
  private user?: any;

  constructor(public dialog: MatDialog, private router: Router) {
    this.AuthStateChanged();
  }
  AuthStateChanged(){
    const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.uid = user.uid;
      window.localStorage.setItem('uid',this.uid)
      this.user = user;
    } else {
      this.uid = undefined;
      window.localStorage.removeItem('uid')
      this.user = undefined;
    }
  });
  return this.user
  }

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

  signInWithEmailLinkAuth(email: string) {
    const auth = getAuth();
    const actionCodeSettings: ActionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: window.location.origin +'/loading',
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

  confirmSignIn(url: string){
    // Confirm the link is a sign-in with email link.
const auth = getAuth();
if (isSignInWithEmailLink(auth, window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  let email = window.localStorage.getItem('emailForSignIn')!;
  // The client SDK will parse the code from the link for you.
  signInWithEmailLink(auth,email , window.location.href)
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


  isAuthenticated(): boolean {
    return !!this.uid;
  }

  getUid(): string | undefined {
    return this.uid;
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.uid = undefined;
    }).catch((error) => {
      console.log('Error occurred during signout:', error);
    });
  }

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
  getCurrentUser(){
    return getAuth().currentUser;
  }
}
