import { Component } from '@angular/core';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-dialog',
  standalone: true,
  imports: [MatDialogActions,MatDialogModule],
  templateUrl: './password-dialog.component.html',
  styleUrl: './password-dialog.component.css'
})
export class PasswordDialogComponent {
  constructor(public dialogRef: MatDialogRef<PasswordDialogComponent>) { }
  ngOnInit(): void{

  }

}
