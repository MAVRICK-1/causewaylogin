import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatmoduleModule } from '../Shared/models/matmodule.module';


import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ForgetpassComponent } from '../Shared/popups/forgetpass/forgetpass.component';
import { PasswordDialogComponent } from '../Shared/popups/password-dialog/password-dialog.component';
import { AuthService } from '../core/AuthService/auth.service';
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

