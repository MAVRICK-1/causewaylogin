import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireStoreService } from '../../core/AuthStore/fire-store-service.service';
import { MatmoduleModule } from '../../Shared/models/matmodule.module';
import { EditSnippetComponent } from '../../Shared/popups/edit-snippet/edit-snippet.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-view-code',
  standalone: true,
  imports: [MatmoduleModule],
  templateUrl: './view-code.component.html',
  styleUrls: ['./view-code.component.css'] // Corrected from styleUrl to styleUrls
})
export class ViewCodeComponent {
  snippet={
    title:'',
    codeSnippet:'',
  }
  id:string=" "
  constructor(private route: ActivatedRoute,private fireStore: FireStoreService, private dialog:MatDialog,
    private _snackBar: MatSnackBar,
    private _clipboard: Clipboard,
  ) { }
  ngOnInit(){
    const docId = this.route.snapshot.paramMap.get('id');
    this.fireStore.getSnippetById(docId!).then((data)=>{
      this.snippet ={
        title:data['title'],
        codeSnippet:data['codeSnippet']
      };
      this.id = docId!;
  })
  }
  copySnippet(code:string){
    this._clipboard.copy(code);
    this._snackBar.open('Code copied to clipboard', 'Close', {
      duration: 2000,
    });
  }
  editSnippet(title: string, codeSnippet: string) {
    const dialogRef = this.dialog.open(EditSnippetComponent, {
      data: { docId: this.id , title: title, codeSnippet: codeSnippet}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Reload snippets after editing
        this.fireStore.editSnippet(this.id, result);
        this.snippet = result;
      }
    });
  }
  shareSnippet(){
    this._clipboard.copy(`http://localhost:4200/share/${window.localStorage.getItem('uid')}?docid=${this.id}&viewerUid=${window.localStorage.getItem('uid')}`
  );
  this._snackBar.open('Code copied to clipboard', 'Close', {
    duration: 2000,
  });

  }

  deleteSnippet(){
    const confirmDelete = confirm('Are you sure you want to delete this snippet?');
    if (confirmDelete) {
      this.fireStore.deleteSnippet(this.id).then((success) => {
        if (success) {
          console.log('Snippet deleted successfully');
        
        } else {
          console.error('Failed to delete snippet');
          // Optionally, you can show an error message to the user
        }
      });
    }
  }
}
