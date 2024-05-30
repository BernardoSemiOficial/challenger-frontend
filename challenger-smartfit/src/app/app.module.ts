import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';
import { ContentTitleComponent } from './components/content-title/content-title.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { HeaderComponent } from './components/header/header.component';
import { LegendsComponent } from './components/legends/legends.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ContentTitleComponent,
		FormComponent,
		CardListComponent,
		CardComponent,
		LegendsComponent,
		FooterComponent,
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
