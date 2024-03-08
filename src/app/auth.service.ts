import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,signOut,onAuthStateChanged,sendPasswordResetEmail} from "firebase/auth";
import { SucesspopComponent } from './sucesspop/sucesspop.component';
import { EmailAlreadyexistComponent } from './email-alreadyexist/email-alreadyexist.component';
import { InvalidemailpasswordComponent } from './invalidemailpassword/invalidemailpassword.component';
import { LinksendComponent } from './linksend/linksend.component';
import { InvalidEmailComponent } from './invalid-email/invalid-email.component';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid?:string;

  constructor(public dialog: MatDialog, private router:Router) { 
    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user

    this.uid = user.uid;
    localStorage.setItem('uid',this.uid);
    console.log(this.uid);
    
    // ...
  } else {
    // User is signed out
    // ...
  }
});
  }
  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log({user});
        this.dialog.open(SucesspopComponent);
        console.log(this.uid);
      this.router.navigate(['/']);
        
        
        // ...
      })
      .catch((error) => {
        
        const errorMessage = error.message;
        console.log(errorMessage);
        if(error.code === "auth/email-already-in-use"){
          this.dialog.open(EmailAlreadyexistComponent);
    
        }
        else{
          this.dialog.open(InvalidEmailComponent);

        }
        
        // ..
      });
  }
  loginUser(email: string, password: string) {
    const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password).
  then((userCredential) => {
    // Signed in 
   const user = userCredential.user;
   console.log({user});
    console.log("login");
    this.router.navigate(['/']);

    
    
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
  
      this.dialog.open(InvalidemailpasswordComponent);


    console.log(errorMessage);
    console.log(errorCode);
    
    
  });
  }
isAuthenticated(){ 
  return this.uid ?true:false;
 }
 getUid(){
    return this.uid;
 }

  logout(){
    const auth = getAuth();
    auth.signOut().then(() => {
      console.log("logout");
      this.uid = "";
      localStorage.setItem('uid',"")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      alert("Something went wrong! While logout");
    }); 
  }



  resetPassword(email:string) {
    const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    console.log("Password reset email sent!");
    this.dialog.open(LinksendComponent);
    
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    this.dialog.open(LinksendComponent);
    

    // ..
  });

  }

}

