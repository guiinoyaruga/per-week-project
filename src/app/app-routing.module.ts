import { NgModule } from '@angular/core';
import { ProductsListComponent } from './products-list/products-list.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonSearchComponent } from './button-product-search/button-search.component';
import { ButtonClientSearchComponent } from './button-client-search/button-client-search.component';

const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'clients', component: ClientsListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
