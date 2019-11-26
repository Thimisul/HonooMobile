import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  modelEventos: {}

  constructor(public Apiservice: ApiService) { }

  ngOnInit() {
    this.getEventos()
  }

  getEventos(){ 
    this.Apiservice.getEvents().subscribe(response => {
        this.modelEventos = response
        console.log(response)
        
    })
  }

}
