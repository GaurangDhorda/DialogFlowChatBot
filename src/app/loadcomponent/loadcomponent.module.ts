import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadcomponentRoutingModule } from './loadcomponent-routing.module';
import { LoadcomponentComponent } from './loadcomponent.component';
import { DynocomponentComponent } from './dynocomponent/dynocomponent.component';
import { NbCardModule, NbListComponent, NbListModule, NbLayoutModule, NbChatModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [LoadcomponentComponent, DynocomponentComponent],
  imports: [
    CommonModule,
    LoadcomponentRoutingModule,
    NbCardModule,
  NbListModule,
  NbEvaIconsModule,
    NbLayoutModule,
    NbChatModule,
    NbSpinnerModule
  ]
})
export class LoadcomponentModule { }
