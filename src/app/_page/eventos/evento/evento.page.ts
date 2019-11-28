import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/_services/api.service';
import { ParticipantResponse } from '../../../_interface/participant';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {

  @Input() id: string
  
  evento: any = {}

  possivelParticipant: any = {};

  mensagens: any = {};
  mensagem: any = {};

  router: any;

  constructor(public modal: ModalController,
              public apiService: ApiService) { }

  ngOnInit() {
    this.getEvento();
    this.getMensagens();
    // if(this.evento.user.id == localStorage.getItem("user_id")){
    //   alert("Bemvindo ao Seu evento!")
    // }else if(this.evento.participant.forEach(part => {
    //   part.id == localStorage.getItem("user_id")
    // })){
    //   alert("Voce participa desse evento!")
    // }
    //this.getMensagens()
  }

  close(){
    this.modal.dismiss({
      retorno: false
    })
  }

  getEvento(){
    this.apiService.getEvent(this.id).subscribe(response => {
      this.evento = response
      console.log(response)
      this.possivelParticipant.eventoId = this.evento.id
      this.possivelParticipant.userId = localStorage.getItem("user_id")
    })
    
  }

  addMensagem(){
    this.mensagem.action = 'cadastro';
    this.apiService.addMensagem(this.mensagem).subscribe(response => {
      if (response.participantId != null) {
        console.log(response)
        alert("MensagemAdicionada")
        //this.router.navigate(['/login']);
      }
   }, error => {
     console.error(error);
    });
  }

  getMensagens(){
    this.apiService.getMensagemEvento(this.id).subscribe(response => {
      this.mensagens = response
      console.log(response)   
    })
  }

  participar(){
 
    this.apiService.addParticipant(this.possivelParticipant).subscribe(response => {
      
        console.log(response)
        alert("Participando")
        this.getEvento()
      
   }, error => {
     console.error(error);
    });
  }

  isParticipant(){

  }
  // delete(){
  //   this.apiService.deleteEvent(this.id)
  //   this.modal.dismiss({
  //     retorno: true
  //   })
  // }

}
