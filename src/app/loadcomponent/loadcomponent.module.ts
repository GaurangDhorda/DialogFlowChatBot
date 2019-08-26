import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadcomponentRoutingModule } from './loadcomponent-routing.module';
import { LoadcomponentComponent } from './loadcomponent.component';


@NgModule({
  declarations: [LoadcomponentComponent],
  imports: [
    CommonModule,
    LoadcomponentRoutingModule
  ]
})
export class LoadcomponentModule { }
