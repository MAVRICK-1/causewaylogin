// eslint-disable-next-line linebreak-style
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/AuthService/auth.service';
import { MatmoduleModule } from '../../models/matmodule.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogActions, MatDialogModule, MatmoduleModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class passwordlessLogin implements OnInit {
  constructor(public authservice:AuthService, public dialoug:MatDialogRef<passwordlessLogin>) { }
  ngOnInit(): void {}
}
