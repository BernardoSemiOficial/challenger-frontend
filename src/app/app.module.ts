import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentTitleComponent } from './components/content-title/content-title.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
	declarations: [AppComponent, HeaderComponent, ContentTitleComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
