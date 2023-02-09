import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  data: any;
  constructor(private http: HttpClient) {}

  async dateFilter(dtInicio: any, dtFim: any) {
    this.data = { inicio: dtInicio, fim: dtFim };
  }

  async getClientData() {
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
    let resultado: any = await this.getClientData();
    //console.log(resultado.data);
    return resultado.lastPage;
  }

  async getClientList(lastPage: any) {
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

      //console.log(dataReceived)
      dataReceived.data.forEach((el: any) => {
        dataModified.push(el);
      });
      //console.log(dataModified);
    }
    let dataArray: any = [];
    for (const orders of dataModified) {
      dataModifiedAgain = {
        name: orders.customer?.name,
        qty:1,
        date: orders.updated_at,
      };

      dataArray.push(dataModifiedAgain);
    }

    console.log(dataArray);
    return dataArray;
  }
}
