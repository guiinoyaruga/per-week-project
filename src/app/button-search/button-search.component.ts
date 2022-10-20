import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-button-search',
  templateUrl: './button-search.component.html',
  styleUrls: ['./button-search.component.css'],
})
export class ButtonSearchComponent implements OnInit {
  data = [];

  @Output() informacaoFilho = new EventEmitter<any>();
  constructor(public productService: ProductService) {}

  ngOnInit(): void {}

  async getProductsData() {
    await this.productService
      .getProductList()
      .then((products: any) => {
        this.data = products;

        this.informacaoFilho.emit(this.data);
      })
      .catch((err: any) => console.log('Erro ao buscar dado', err));
  }
}
