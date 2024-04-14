import { Component, Inject } from '@angular/core';
import { MatmoduleModule } from '../../models/matmodule.module';
import { FormsModule } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-snippet',
  standalone: true,
  imports: [MatmoduleModule,FormsModule],
  templateUrl: './edit-snippet.component.html',
  styleUrl: './edit-snippet.component.css'
})
export class EditSnippetComponent {
  codeData:any

  constructor(
    private dialogRef:MatDialogRef<EditSnippetComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ){
    this.codeData=data
    console.log(this.codeData);
    
  }
  onSave(): void {
    this.dialogRef.close(this.codeData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
