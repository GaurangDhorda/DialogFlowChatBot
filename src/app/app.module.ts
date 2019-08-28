import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbChatModule, NbSpinnerModule, NbSidebarModule, NbIconModule  } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbEvaIconsModule,
    NbLayoutModule,
    NbChatModule,
    NbSpinnerModule,
    NbIconModule,
    NbSidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
