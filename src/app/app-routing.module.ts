import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from '@authGuard';

const routes: Routes = [{path: '', redirectTo: 'login',  pathMatch: 'full'},
                        {path: 'login', component: LoginComponent},
                        {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
                        {path: 'loadcomponent', loadChildren: () => import('./loadcomponent/loadcomponent.module')
                        .then(m => m.LoadcomponentModule), canLoad: [AuthGuard] }
                        ];
                        // if import error is occured then go to tsconfig.json file and change module:2015 to esnext.
export const routerComponent = [LoginComponent, ChatComponent];
@NgModule({
  providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }
