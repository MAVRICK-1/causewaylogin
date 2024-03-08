import { Component } from '@angular/core';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatmoduleModule } from '../matmodule/matmodule.module';
@Component({
  selector: 'app-email-alreadyexist',
  standalone: true,
  imports: [MatmoduleModule, MatDialogModule, MatDialogActions],
  templateUrl: './email-alreadyexist.component.html',
  styleUrl: './email-alreadyexist.component.css'
})
export class EmailAlreadyexistComponent {
  constructor(public dialogRef: MatDialogRef<EmailAlreadyexistComponent>) { }
  ngOnInit(): void{

  }

}
