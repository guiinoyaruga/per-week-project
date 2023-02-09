import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-button-client-search',
  templateUrl: './button-client-search.component.html',
  styleUrls: ['./button-client-search.component.css'],
})
export class ButtonClientSearchComponent implements OnInit {
  @Output() ButtonInfoToFatherClients = new EventEmitter<any>();
  dtInicio: any;
  dtFim: any;
  datateste: any;

  constructor(public clientsService: ClientsService) {}

  ngOnInit(): void {}

  async getButtonFunctions() {
    await this.getDate();
    await this.getClientsData(this.datateste);
  }

  async getDate() {
    if (this.dtInicio <= this.dtFim) {
      let date = await this.clientsService.dateFilter(
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

  async getClientsData(dtOfWeek: any) {
    let lastPage = await this.clientsService.lastPageSaved();
    let data: any = [];
    let elemPerWeek: any = [];
    //wconsole.log(dtOfWeek);

    await this.clientsService
      .getClientList(lastPage)
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
      this.ButtonInfoToFatherClients.emit(elemPerWeek);
    } else if (
      elemPerWeek.length == 0 &&
      elemPerWeek.length != null &&
      dtOfWeek >= 0
    ) {
      alert('Não há produtos nesse dia da semana');
    }
  }
}
