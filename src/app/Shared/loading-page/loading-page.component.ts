import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.css',
})
export class LoadingPageComponent implements OnInit {
  authService = inject(AuthService);
  constructor( private router:Router) {}
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    const url = this.router.url;
    console.log('from constructor' + window.location.search);
    this.confirmSignUrl(url);
  }

  confirmSignUrl(url:string) {
    console.log(url);
    this.authService.confirmSignIn(url);
  }
}
