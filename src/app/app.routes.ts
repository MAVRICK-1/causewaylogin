import { Routes } from '@angular/router';
import { LoadingPageComponent } from './Shared/loading-page/loading-page.component';
import { SingupComponent } from './singup/singup.component';
import { CodebinComponent } from './pages/codebin/codebin.component';
import { ViewSnippetsComponent } from './pages/view-snippets/view-snippets.component';
import { ViewCodeComponent } from './pages/view-code/view-code.component';
import { landingPageComponent } from './pages/LandingPage/login.component';
import { ShareComponentComponent } from './pages/share-snippets/share-component.component';
export const routes: Routes = [
    {path:'signup',component:SingupComponent},
    {path:'loading',component:LoadingPageComponent},
    {path:'codebin',component:CodebinComponent},
    { path: 'snippet', component: ViewSnippetsComponent },
    { path: 'code/:id', component: ViewCodeComponent  },
    {path:'share/:id',component:ShareComponentComponent},
    {path:'',component:landingPageComponent},
];
