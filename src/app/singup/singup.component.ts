import { Component } from '@angular/core';
import { MatmoduleModule } from '../matmodule/matmodule.module';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';


import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { ForgetpassComponent } from '../forgetpass/forgetpass.component';
//MatFormFieldModule,MatInputModule,ReactiveFormsModule
@Component({
  standalone: true,
  imports: [MatmoduleModule,PasswordDialogComponent,FormsModule,
  MatFormFieldModule,MatInputModule,ReactiveFormsModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})

export class SingupComponent {
  hide=true;
  signupp=true
  //signup =true;
  constructor(public dialog: MatDialog, private authservice:AuthService) { }
  LoginEmailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  PasswordFromControl = new FormControl('', [Validators.required,Validators.minLength(6)]);
  ConformPasswordFromControl = new FormControl('', [Validators.required,Validators.minLength(6)]);
  LoginPasswordFromControl = new FormControl('', [Validators.required,Validators.minLength(6)]);


  togglePassword(): void {
    this.signupp = !this.signupp;
  }
  toggleLoginPassword(): void {
    this.hide = !this.hide;
  }
  login(email: string, password: string): void {
    this.authservice.loginUser(email,password);
    console.log(email,password);
  }

  signup(password: string, confirmPassword: string,email:string): void {
    if (password !== confirmPassword) {
      this.dialog.open(PasswordDialogComponent);
    } else {
      console.log(email,password);
      this.authservice.registerUser(email,password);
      //this.authservice.loginUser(email,password);
        // Proceed with signup
    }
  }
  forget(){
    this.dialog.open(ForgetpassComponent)
  }
}

