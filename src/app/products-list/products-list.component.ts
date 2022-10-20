import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  @Input() informacaoPai: any;
  dataByService: any = [];

  constructor(public productService: ProductService) {}

  ngOnInit(): void {}

  sendData($event: any) {
    let elemCounted: any = [];

    $event = $event.sort(); // Reorganiza os elementos recebidos entre os components

    for (const element of $event) {
      // Cada elemento de $event é verificado e reorganizado por countQuantity para depois se jogado num objeto
      if (this.countQuantity($event)) {
        let objElements = {
          name: element,
        };

        elemCounted.push(objElements); // Por fim, é colocado em um array, todos os elementos do objetos já reorganizados
      }
    }
  }

  countQuantity($event: any) {
    let countedArray = [];
    let qty = 1;

    for (let i = 0; i < $event.length; i++) {
      if ($event[i] === $event[i + 1]) {
        qty++;
      } else {
        countedArray.push({ name: $event[i], qty: qty });
        qty = 1;
      }
    }

    this.dataByService = countedArray; // Data recebe Array contado
    this.dataByService = this.dataByService.sort((a: any, b: any) => {
      // Os elementos do Array são reorganizado novamente
      return b.qty - a.qty;
    });

    return this.dataByService;
  }
}
