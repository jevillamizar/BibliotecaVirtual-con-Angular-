import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BooksComponent } from './components/books/books.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { BookComponent } from './components/book/book.component';
import { SearchComponent } from './components/search/search.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    HomeComponent,
    SidebarComponent,
    BooksComponent,
    FormularioComponent,
    BookComponent,
    SearchComponent,
    ErrorComponent    
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
