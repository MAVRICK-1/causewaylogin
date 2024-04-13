import { Component } from '@angular/core';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatmoduleModule } from '../../models/matmodule.module';

@Component({
  selector: 'app-invalidemailpassword',
  standalone: true,
  imports: [MatmoduleModule, MatDialogModule, MatDialogActions],
  templateUrl: './invalidemailpassword.component.html',
  styleUrl: './invalidemailpassword.component.css'
})
export class InvalidemailpasswordComponent {
  constructor(public dialogRef: MatDialogRef<InvalidemailpasswordComponent>) { }
  ngOnInit(): void{

  }

}
