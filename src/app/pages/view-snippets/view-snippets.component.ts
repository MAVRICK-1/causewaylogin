import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatmoduleModule } from '../../Shared/models/matmodule.module';
import { EditSnippetComponent } from '../../Shared/popups/edit-snippet/edit-snippet.component';
import { FireStoreService } from '../../core/AuthStore/fire-store-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { LoadingPageComponent } from '../../Shared/loading-page/loading-page.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-snippets',
  templateUrl: './view-snippets.component.html',
  styleUrls: ['./view-snippets.component.css'],
  standalone:true,
  imports:[MatmoduleModule,EditSnippetComponent,LoadingPageComponent]
})
export class ViewSnippetsComponent implements OnInit {
  snippets: any[] = [];
  uid:any
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FireStoreService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _clipboard: Clipboard,
    private location: Location,
  ) {}

  ngOnInit() {
    this.loadSnippets(); // Call loadSnippets() when the component initializes
  }
  truncatedSnippets: { [key: string]: boolean } = {};

getTruncatedSnippet(codeSnippet: string): string {
  const maxLength = 30; // Change this to the desired maximum length
  return this.truncatedSnippets[codeSnippet] ? codeSnippet : codeSnippet.slice(0, maxLength) + '...';
}

isExpanded(snippet: any): boolean {
  return this.truncatedSnippets[snippet.codeSnippet];
}

  addCode(){
    this.router.navigate(['codebin']);

  }

  async loadSnippets() {
    this.isLoading = true; // Set loading flag to true
    try {
      this.snippets = await this.firestoreService.getAllSnippet();
      console.log(this.snippets);
    } catch (error) {
      console.error('Error loading snippets:', error);
    }finally{
      this.isLoading = false; // Set loading flag to false
    }
  }

  editSnippet(docId: string, title: string, codeSnippet: string) {
    const dialogRef = this.dialog.open(EditSnippetComponent, {
      data: { docId: docId , title: title, codeSnippet: codeSnippet}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Reload snippets after editing
        this.firestoreService.editSnippet(docId, result);
        this.loadSnippets();
      }
    });
  }

  deleteSnippet(docId: string) {
    const confirmDelete = confirm('Are you sure you want to delete this snippet?');
    if (confirmDelete) {
      this.firestoreService.deleteSnippet(docId).then((success) => {
        if (success) {
          console.log('Snippet deleted successfully');
          // Reload snippets after deletion
          this.loadSnippets();
        } else {
          console.error('Failed to delete snippet');
          // Optionally, you can show an error message to the user
        }
      });
    }
  }
  copySnippet(code:string){
    this._clipboard.copy(code);
  this._snackBar.open('Code copied to clipboard', 'Close', {
    duration: 2000,
  });
  }
  fullCodeView(Docid:string){
    this.router.navigate([`code/${Docid}`]);

  }
  shareLink(docId:string){

    this._clipboard.copy( `https://causewaylogin.vercel.app/share/${window.localStorage.getItem('uid')}?docid=${docId}&viewerUid=${window.localStorage.getItem('uid')}`
  );
  this._snackBar.open('Code copied to clipboard', 'Close', {
    duration: 2000,
  });

  }
}
