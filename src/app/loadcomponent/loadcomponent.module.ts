import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadcomponentRoutingModule } from './loadcomponent-routing.module';
import { LoadcomponentComponent } from './loadcomponent.component';
import { DynocomponentComponent } from './dynocomponent/dynocomponent.component';
import {NebularModuleModule} from '@nebularModule/nebular-module.module';


@NgModule({
  declarations: [LoadcomponentComponent, DynocomponentComponent],
  imports: [
    CommonModule,
    LoadcomponentRoutingModule,
    NebularModuleModule
  ]
})
export class LoadcomponentModule { }