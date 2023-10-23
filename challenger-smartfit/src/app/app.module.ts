import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { ContentTitleComponent } from './components/content-title/content-title.component';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ContentTitleComponent,
		FormComponent,
		CardListComponent,
  CardComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		CommonModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
