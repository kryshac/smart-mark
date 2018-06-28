import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookmarkButtonComponent, NavbarColumnComponent } from './components';
import { AddBookmarkComponent } from './components/add-bookmark/add-bookmark.component';
import { DialogAlertComponent } from './components/dialog-alert/dialog-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarColumnComponent,
    AddBookmarkButtonComponent,
    AddBookmarkComponent,
    DialogAlertComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddBookmarkComponent, DialogAlertComponent],
})
export class AppModule {}
