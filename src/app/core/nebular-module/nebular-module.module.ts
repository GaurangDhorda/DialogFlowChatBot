import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbChatModule, NbSpinnerModule, NbSidebarModule,
  NbIconModule, NbProgressBarModule, NbCardModule, NbListModule  } from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbEvaIconsModule,
    NbLayoutModule,
    NbChatModule,
    NbSpinnerModule,
    NbIconModule,
    NbEvaIconsModule,
    NbProgressBarModule,
    NbCardModule,
    NbSidebarModule.forRoot(),
    NbListModule
  ],
  exports :[
    NbThemeModule,
    NbEvaIconsModule,
    NbLayoutModule,
    NbChatModule,
    NbSpinnerModule,
    NbIconModule,
    NbEvaIconsModule,
    NbProgressBarModule,
    NbCardModule,
    NbSidebarModule,
    NbListModule
  ]
})
export class NebularModuleModule { }
