import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadcomponentComponent } from './loadcomponent.component';

const routes: Routes = [{ path: '', component: LoadcomponentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadcomponentRoutingModule { }
