import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/AuthService/auth.service';
import { MatmoduleModule } from '../../models/matmodule.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatmoduleModule,RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService:AuthService) {}

   
  logout() {
    this.authService.logout();}

}

