import { Routes } from '@angular/router';
import { LoadingPageComponent } from './Shared/loading-page/loading-page.component';
import { landingPageComponent } from './pages/LandingPage/login.component';
import { CodebinComponent } from './pages/codebin/codebin.component';
import { ShareComponentComponent } from './pages/share-snippets/share-component.component';
import { SingupComponent } from './pages/singup/singup.component';
import { ViewCodeComponent } from './pages/view-code/view-code.component';
import { ViewSnippetsComponent } from './pages/view-snippets/view-snippets.component';
import { authGuard } from './core/authguard/auth.guard';


export const routes: Routes = [
    {path:'signup',component:SingupComponent},
    {path:'loading',component:LoadingPageComponent},
    {path:'codebin',component:CodebinComponent,canActivate:[authGuard]},
    { path: 'snippet', component: ViewSnippetsComponent,canActivate:[authGuard] },
    { path: 'code/:id', component: ViewCodeComponent ,canActivate:[authGuard]},
    {path:'share/:id',component:ShareComponentComponent},
    {path:'home',component:landingPageComponent},
    {path:'',component:landingPageComponent},
    {path:'**',redirectTo:'',pathMatch:'full'}
];
