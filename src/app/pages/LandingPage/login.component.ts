import { Component } from '@angular/core';
import { MatmoduleModule } from '../../Shared/models/matmodule.module';
import { Router } from '@angular/router';
import { AuthService } from '../../core/AuthService/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { passwordlessLogin } from '../../Shared/popups/passwordlessLogin/login.component';


@Component({
  selector: 'app-codebin',
  standalone: true,
  imports: [MatmoduleModule],
  templateUrl: './landingPage.component.html',
  styleUrl: './landingPage.component.css'
})
export class landingPageComponent {

  constructor(private authService:AuthService,private router:Router,private dialouge:MatDialog) { }

  passwordlessLogin(){
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/snippet'])
    }
    else{
        this.dialouge.open(passwordlessLogin)
    }
}


}
