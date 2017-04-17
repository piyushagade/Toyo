import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routes} from './app.router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ChatComponent } from './components/chat.component';
import { AngularFireModule } from 'angularfire2';
import { MarkdownModule } from 'angular2-markdown';
import { NgPipesModule } from 'ngx-pipes';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { SmartDatePipe } from './pipes/smart-date.pipe';
import { EmojifyModule } from 'angular2-emojify';
import { EmojiPickerModule } from 'angular2-emoji-picker';

// Must export the config
export const firebaseConfig = {
    apiKey: 'AIzaSyDGQXrUqmDYkw9YvY2iQ9xRk5Z2XeJvUyg',
    authDomain: 'toyo-32ad5.firebaseapp.com',
    databaseURL: 'https://toyo-32ad5.firebaseio.com',
    projectId: 'toyo-32ad5',
    storageBucket: 'toyo-32ad5.appspot.com',
    messagingSenderId: '573212570755'
};


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    HomeComponent,
    RelativeDatePipe,
    SmartDatePipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,
    MarkdownModule,
    NgPipesModule,
    EmojifyModule,
    EmojiPickerModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
