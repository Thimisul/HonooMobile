import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { ModalController } from '@ionic/angular';
import { EventoPage } from '../eventos/evento/evento.page';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  eventsModel: {}
  meusEventsModel: any = {}
  partipateEventsModel: any = {}
  eventsTodayModel: any = {}

  userId: string
  tipoEventos: any;

  constructor(public apiService: ApiService,
              public modal: ModalController) {
    this.userId = localStorage.getItem("user_id")
   }

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
    this.apiService.getEvents().subscribe(response => {
      this.eventsModel = response
      console.log(this.eventsModel)
    });
  }

  async openEvento(id){
    const pagina = await this.modal.create({
      component: EventoPage,
      componentProps: {id: id, tipoEventos: this.tipoEventos}
    })
    await pagina.present();

    const {data} = await pagina.onDidDismiss();
    console.log(data)
  }

  getTipoEventos(){
    this.apiService.getTipoEventos().subscribe(response => {
      this.tipoEventos = response
      console.log(response)
    })
  }
}
