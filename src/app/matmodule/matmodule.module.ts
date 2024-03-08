import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';


const material =[CommonModule,MatToolbarModule,MatIcon,MatButtonModule,MatCommonModule,MatListModule,MatInputModule,
MatFormFieldModule,MatStepperModule, ReactiveFormsModule,MatCardModule,MatTabsModule]


@NgModule({
  declarations: [],
  imports: [
    material
  ],
  exports:[
    material

  ]
})
export class MatmoduleModule { }
