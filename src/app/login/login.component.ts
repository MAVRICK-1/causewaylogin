import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatmoduleModule } from '../matmodule/matmodule.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatmoduleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  uid:any
  constructor(public authservice:AuthService) { } 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
    
  }

}
