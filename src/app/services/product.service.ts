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
        '',
        {
          headers: new HttpHeaders({
            Authorization:
              'Bearer ',
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
