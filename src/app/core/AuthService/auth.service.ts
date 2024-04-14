import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActionCodeSettings, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup, signOut } from 'firebase/auth';
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

  signInWithEmailLink(email: string) {
    const auth = getAuth();
    const actionCodeSettings: ActionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: window.location.origin + '/loading',
      // This must be true.
      handleCodeInApp: true,
    }
  
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        // Email sent.
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }

  confirmSignIn(url: string){
    const auth = getAuth();
    const email = window.localStorage.getItem('emailForSignIn') || '';
    signInWithEmailLink(auth, email, url)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }

  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.dialog.open(SucesspopComponent);
        this.router.navigate(['/']);
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

  sendLink(email: string) {

const auth = getAuth();
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
};

sendSignInLinkToEmail(auth, email, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['/']);
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
      localStorage.removeItem('uid');
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
