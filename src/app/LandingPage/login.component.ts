import { Component } from '@angular/core';
import { MatmoduleModule } from '../Shared/models/matmodule.module';
import { AuthService } from '../auth.service';
import {  MatDialog, MatDialogRef } from '@angular/material/dialog';
import { passwordlessLogin } from '../Shared/popups/passwordlessLogin/login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatmoduleModule],
  templateUrl: './landingPage.component.html',
  styleUrl: './landingPage.component.css'
})

export class LoginComponent {
  uid:any
  constructor(public authservice:AuthService, private dialogue:MatDialog) { } 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
    
  }
  passwordlessLogin(){
    this.dialogue.open(passwordlessLogin)

  }
  

}
