import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-button-search',
  templateUrl: './button-search.component.html',
  styleUrls: ['./button-search.component.css'],
})
export class ButtonSearchComponent implements OnInit {
  @Output() ButtonInfoToFatherProducts = new EventEmitter<any>();
  dtInicio: any;
  dtFim: any;
  datateste: any;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {}

  async getButtonFunctions() {
    await this.getDate();
    await this.getProductsData(this.datateste);
  }

  async getDate() {
    if (this.dtInicio <= this.dtFim) {
      let date = await this.productService.dateFilter(
        this.dtInicio,
        this.dtFim
      );
      console.log(this.dtInicio, this.dtFim);
    } else if (this.dtInicio > this.dtFim) {
      alert('Data inicial maior que data final! Verifique novamente');
    } else if (!this.dtInicio && !this.dtFim) {
      alert('Digite uma data ínicio e fim');
    }
  }

  async getProductsData(dtOfWeek: any) {
    let lastPage = await this.productService.lastPageSaved();
    let data: any = [];
    let elemPerWeek: any = [];
    //console.log(dtOfWeek);

    await this.productService
      .getProductList(lastPage)
      .then((products: any) => {
        data = products;
      })
      .catch((err: any) => console.log('Erro ao buscar dado', err));
    for (const elem of data) {
      let dtMoment = moment(elem.date).day();

      if (dtMoment == dtOfWeek) {
        let objOfWeek = {
          name: elem.name,
          qty: elem.qty,
          date: elem.date,
        };
        elemPerWeek.push(objOfWeek);
        console.log(objOfWeek);
      }
    }
    if (elemPerWeek.length > 0) {
      this.ButtonInfoToFatherProducts.emit(elemPerWeek);
      console.log(this.ButtonInfoToFatherProducts)
    } else if (
      elemPerWeek.length == 0 &&
      elemPerWeek.length != null &&
      dtOfWeek >= 0
    ) {
     alert("Não há produtos neste dia da semana!")
    }
  }
}
