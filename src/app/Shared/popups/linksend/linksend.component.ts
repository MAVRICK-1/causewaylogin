import { Component } from '@angular/core';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-linksend',
  standalone: true,
  imports: [MatDialogActions, MatDialogModule],
  templateUrl: './linksend.component.html',
  styleUrl: './linksend.component.css'
})
export class LinksendComponent {

}
