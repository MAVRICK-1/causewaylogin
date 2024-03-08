import { Component } from '@angular/core';
import { MatmoduleModule } from '../matmodule/matmodule.module';
import { AuthService } from '../auth.service';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgetpass',
  standalone: true,
  imports: [MatmoduleModule,FormsModule,MatDialogModule,MatDialogActions],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css'
})
export class ForgetpassComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  constructor(public authservice:AuthService,public dialogRef: MatDialogRef<ForgetpassComponent>) {}

  resetPassword(email: string): void {
    this.authservice.resetPassword(email);
  }


}
