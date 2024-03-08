import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';

export const routes: Routes = [
    //{path:'login',component:LoginComponent},
    {path:'singup',component:SingupComponent},
    {path:'',component:LoginComponent}

];
