import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ButtonSearchComponent } from './button-search/button-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [AppComponent, ProductsListComponent, ButtonSearchComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [ProductService, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
