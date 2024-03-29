import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  @Input() ButtonInfoReceived: any;
  dataByService: any = [];

  constructor(public productService: ProductService) {}

  ngOnInit(): void {}

  sendData($event: any) {
    let elemCounted: any = [];

    $event = $event.sort((a: any, b: any) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.nome > b.nome) {
        return 1;
      }
      return 0;
    }); // Reorganiza os elementos recebidos entre os components

    //console.log($event)
    for (const element of $event) {
      // Cada elemento de $event é verificado e reorganizado por countQuantity para depois se jogado num objeto
      if (this.countQuantity($event)) {
        let objElements = {
          name: element.name,
          qty: element.qty,
        };

        elemCounted.push(objElements); // Por fim, é colocado em um array, todos os elementos do objetos já reorganizados
      }
    }
    //console.log(elemCounted);
    //console.log(this.dataByService);
  }

  countQuantity($event: any) {
    const contArray = $event.reduce((acc: any, prop: any) => {
      let elem = acc
        .filter((obj: any) => {
          return obj.name == prop.name;
        })
        .pop() || { name: prop.name, qty: 0, date: prop.date, pos: prop.pos };
      elem.qty += prop.qty;
      acc.push(elem);

      return acc;
    }, []);

    const filterElemRepet = contArray.filter(
      (item: any, first: any, next: any) => {
        return first == next.indexOf(item);
      }
    );
    this.dataByService = filterElemRepet; // Data recebe Array contado
    this.dataByService = this.dataByService.sort((a: any, b: any) => {
      // Os elementos do Array são reorganizado novamente
      return b.qty - a.qty;
    });
    return this.dataByService;
  }
}
