import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookmarkComponent, NavbarColumnComponent } from './components';

@NgModule({
  declarations: [AppComponent, NavbarColumnComponent, AddBookmarkComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
