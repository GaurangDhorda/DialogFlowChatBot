import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NebularModuleModule} from './nebular-module/nebular-module.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NebularModuleModule
  ],
  exports : [NebularModuleModule]
})
export class CoreModule { }
