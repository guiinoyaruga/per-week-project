import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  async getProductList() {
    let dataModified: any = [];
    let dataModifiedAgain: any = [];
    let dataReceived: any = await this.http
      .get(
        'https://report.yooga.com.br/delivery/relatorio?inverse=true&page=1&data_inicio=2021-08-01&data_fim=2021-12-30&tipo=1&pedido_status=FINISHED',
        {
          headers: new HttpHeaders({
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExNjU0LCJpYXQiOjE2NjM4ODExMzZ9.4ZGCysZEql7GrgE4fTBKYKD5LhWEQHMz1PPvY2_rkYs',
          }),
        }
      )
      .toPromise();

    dataReceived.data.forEach((el: any) => {
      dataModified.push(el.items);
    });

    for (let i = 0; i < dataModified.length; i++) {
      for (let j = 0; j < dataModified[i].length; j++) {
        dataModifiedAgain[i] = dataModified[i][j].name
      }
    }

    return dataModifiedAgain;
  }
}
