import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadcomponentComponent } from './loadcomponent.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatbotdialogflowService } from '@chatService';

const routes: Routes = [{ path: '', component: LoadcomponentComponent }];

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ChatbotdialogflowService,
    multi: true
  }],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadcomponentRoutingModule { }
