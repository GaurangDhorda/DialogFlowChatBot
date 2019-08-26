import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'loadcomponent', loadChildren: () => import('./loadcomponent/loadcomponent.module')
                        .then(m => m.LoadcomponentModule) }];
                        // if import error is occured then go to tsconfig.json file and change module:2015 to esnext.
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
