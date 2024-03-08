import { Component } from '@angular/core';
import { MatmoduleModule } from '../matmodule/matmodule.module';
import { MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

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
