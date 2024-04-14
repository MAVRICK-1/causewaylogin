import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatmoduleModule } from '../../Shared/models/matmodule.module';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireStoreService } from '../../core/AuthStore/fire-store-service.service';

@Component({
  selector: 'app-share-component',
  standalone: true,
  imports: [MatmoduleModule],
  templateUrl: './share-component.component.html',
  styleUrl: './share-component.component.css'
})
export class ShareComponentComponent {
  uid!:string;
  docid!: string;
  snippet={
    title:'',
    codeSnippet:'',
  }

  constructor(private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _clipboard: Clipboard,
    private fireStore: FireStoreService
  ) { }

  ngOnInit(): void {
    // Read the uid and docid from the URL parameters
    this.route.queryParams.subscribe(params => {
      this.uid = params['viewerUid'];
      this.docid = params['docid'];
      // Call function with uid and docid
      console.log(this.uid);
      console.log(this.docid);
      this.getSnippet();
      
      
    });

  }
  getSnippet(){
    this.fireStore.ShareSnippetById(this.docid,this.uid).then((data)=>{
      this.snippet ={
        title:data['title'],
        codeSnippet:data['codeSnippet']
      };
  })
  }
  copySnippet(code:string){
    this._clipboard.copy(code);
  this._snackBar.open('Code copied to clipboard', 'Close', {
    duration: 2000,
  });
  }

}
