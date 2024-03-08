import { Component } from '@angular/core';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invalid-email',
  standalone: true,
  imports: [ MatDialogActions, MatDialogModule ],
  templateUrl: './invalid-email.component.html',
  styleUrl: './invalid-email.component.css'
})
export class InvalidEmailComponent {
  constructor(public dialogRef: MatDialogRef<InvalidEmailComponent>) { }


}
