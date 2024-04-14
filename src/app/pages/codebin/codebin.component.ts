import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatmoduleModule } from '../../Shared/models/matmodule.module';
import { FireStoreService } from '../../core/AuthStore/fire-store-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-codebin',
  standalone: true,
  imports: [MatmoduleModule],
  templateUrl: './codebin.component.html',
  styleUrl: './codebin.component.css'
})
export class CodebinComponent {
  binForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private fireStore:FireStoreService,private router:Router) { }

  ngOnInit(): void {
    this.binForm = this.formBuilder.group({
      title: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  save(): void {
    if (this.binForm.valid) {
      const title = this.binForm.get('title')!.value;
      const codeSnippet = this.binForm.get('code')!.value;
      this.fireStore.createSnippet({title, codeSnippet});
      console.log('Title:', title);
      console.log('Code Snippet:', codeSnippet);
      this.router.navigate(['snippet']);

    }
  }
  

}
