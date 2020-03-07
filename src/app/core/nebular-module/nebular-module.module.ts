import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbThemeModule, NbLayoutModule, NbChatModule, NbSpinnerModule, NbSidebarModule,
  NbIconModule, NbProgressBarModule, NbCardModule, NbListModule , 
  NbPopoverModule, NbButtonModule, NbSidebarService } from '@nebular/theme';
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
    NbListModule,
    NbPopoverModule,
    NbButtonModule
  ],
  exports: [
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
    NbListModule,
    NbPopoverModule,
    NbButtonModule
  ]
})
export class NebularModuleModule {
  // forRoot with ModuleWithProviders is used when lazy and eager module wants to have same state of NbServiceModule..
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NebularModuleModule,
      providers: [NbSidebarModule.forRoot().providers]
    };
  }
 }
