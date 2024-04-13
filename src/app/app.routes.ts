import { Routes } from '@angular/router';
import { LoginComponent } from './LandingPage/login.component';
import { SingupComponent } from './singup/singup.component';
import { LoadingPageComponent } from './Shared/loading-page/loading-page.component';
export const routes: Routes = [
    //{path:'login',component:LoginComponent},
    {path:'signup',component:SingupComponent},
    {path:'loading',component:LoadingPageComponent},
    {path:'',component:LoginComponent}

];
