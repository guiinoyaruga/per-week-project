import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  data: any;
  constructor(private http: HttpClient) {}

  async dateFilter(dtInicio: any, dtFim: any) {
    this.data = { inicio: dtInicio, fim: dtFim };
  }

  async getProductData() {

    return this.http
      .get(
        'https://report.yooga.com.br/delivery/relatorio?inverse=true&page=1&data_inicio=' +
          this.data.inicio +
          '&data_fim=' +
          this.data.fim +
          '&tipo=1&pedido_status=FINISHED',
        {
          headers: new HttpHeaders({
            Authorization:
              '',
          }),
        }
      )
      .toPromise();
  }

  async lastPageSaved() {
    let resultado: any = await this.getProductData();
    //console.log(resultado.data);
    return resultado.lastPage;
  }

  async getProductList(lastPage: any) {
    let page = 1;
    let dataModified: any = [];
    let dataModifiedAgain: any = {};

    for (page; page <= lastPage; page++) {
      let dataReceived: any = await this.http
        .get(
          'https://report.yooga.com.br/delivery/relatorio?inverse=true&page=' +
            page +
            '&data_inicio=' +
            this.data.inicio +
            '&data_fim=' +
            this.data.fim +
            '&tipo=1&pedido_status=FINISHED',
          {
            headers: new HttpHeaders({
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE1ODQ0LCJpYXQiOjE2NjYxMjcwNzJ9.VZTfF9eXBWxD1Ub0Z-gfZK3ygDMgJqd-OFt6svkWly4',
            }),
          }
        )
        .toPromise();

      console.log(dataReceived)
      dataReceived.data.forEach((el: any) => {
        dataModified.push(el);
      });
      console.log(dataModified);
    }
    let dataArray: any = [];
    for (const orders of dataModified) {
      for (const orderItem of orders.items) {
        dataModifiedAgain = {
          name: orderItem.name,
          qty: orderItem.qty,
          date: orders.updated_at,
        };

        dataArray.push(dataModifiedAgain);
      }
    }
    console.log(dataArray);
    return dataArray;
  }
}
