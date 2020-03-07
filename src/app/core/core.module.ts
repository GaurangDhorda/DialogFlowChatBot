import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NebularModuleModule} from './nebular-module/nebular-module.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NebularModuleModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports : [ReactiveFormsModule, FormsModule, HttpClientModule , NebularModuleModule]
})
export class CoreModule { }
