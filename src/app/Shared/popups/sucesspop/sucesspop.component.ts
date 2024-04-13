import { Component } from '@angular/core';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatmoduleModule } from '../../models/matmodule.module';

@Component({
  selector: 'app-sucesspop',
  standalone: true,
  imports: [MatmoduleModule,MatDialogActions,MatDialogModule],
  templateUrl: './sucesspop.component.html',
  styleUrl: './sucesspop.component.css'
})
export class SucesspopComponent {
  constructor(public dialogRef: MatDialogRef<SucesspopComponent>) { }
  ngOnInit(): void{

  }

}
