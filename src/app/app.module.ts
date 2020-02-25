import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbChatModule, NbSpinnerModule, NbSidebarModule, 
         NbIconModule, NbProgressBarModule, NbCardModule, NbListModule  } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
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
    NbEvaIconsModule,
    NbProgressBarModule,
    NbCardModule,
    FormsModule,
    NbSidebarModule.forRoot(),
    ReactiveFormsModule,
    NbListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
