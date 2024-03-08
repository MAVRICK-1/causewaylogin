import { Component } from '@angular/core';
import { MatmoduleModule } from '../matmodule/matmodule.module';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatmoduleModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService:AuthService) {

   }
  logout() {
    this.authService.logout();}

}

