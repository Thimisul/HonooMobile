import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { ModalController } from '@ionic/angular';
import { EventoPage } from '../evento/evento.page';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  modelEventos: {}
  tipoEventos: {}

  start_date: string
  end_date: string
  event_type: string

  constructor(public Apiservice: ApiService,
              public modal: ModalController) { }

  ngOnInit() {
    this.getTipoEventos()
    this.getEventos()
  }


  getEventos(){ 
    this.Apiservice.getEvents().subscribe(response => {
        this.modelEventos = response
        console.log(response)
        
    })
  }



  pesquisar(){
    this.Apiservice.getEventSearch(this.start_date,this.end_date,this.event_type).subscribe(response => {
      this.modelEventos = response
      console.log(response)
      
    })
  }

  getTipoEventos(){
    this.Apiservice.getTipoEventos().subscribe(response => {
      this.tipoEventos = response
      console.log(this.tipoEventos)
    })
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

  async addEvento(){

    const pagina = await this.modal.create({
      component: EventoPage,
      componentProps: {id: 0, tipoEventos: this.tipoEventos}
    })
    await pagina.present();
    const {data} = await pagina.onDidDismiss();
    console.log(data)
  }

}
