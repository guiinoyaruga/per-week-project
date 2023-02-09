import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ButtonSearchComponent } from './button-product-search/button-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ButtonClientSearchComponent } from './button-client-search/button-client-search.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ButtonSearchComponent,
    ClientsListComponent,
    ButtonClientSearchComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [ProductService, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
