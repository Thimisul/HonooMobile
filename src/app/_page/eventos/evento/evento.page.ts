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

  @Input() id: bigint
  @Input() tipoEventos: any = {}

  
  evento: any = {}

  possivelParticipant: any = {};

  mensagens: any = {};

  msg: any = {}

  router: any;

  participant: any;

  isParticipant: boolean
  isOwner: boolean

  constructor(public modal: ModalController,
              public apiService: ApiService) { }

  ngOnInit() {
    if(this.id > 0){
    this.getEvento();
    this.getMensagens();
    }else{
      this.evento.id = 0
      this.evento.eventoId = '1'
      this.isOwner = true
      this.evento.ownerId = localStorage.getItem("user_id")
      console.log(this.isOwner)
    }

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
      this.evento.participant.forEach(part => {
        if(this.possivelParticipant.userId == part.id){
          this.isParticipant = true
          console.log("Participante? " + this.isParticipant)
        }else{
          this.isParticipant = false
          console.log("Participante? " + this.isParticipant)
        }
        if(this.possivelParticipant.userId == this.evento.user.id){
          this.isOwner = true
          console.log("Dono do Evento? " + this.isOwner)
        }else{
          this.isOwner = false
          console.log("Dono do Evento? " + this.isOwner)
        }
      });
    })
    
  }

  addMensagem(){
    console.log(this.msg.message)
      this.evento.participant.forEach(part => {
        if(part.userId == localStorage.getItem("user_id")){
            this.msg.participantId = part.id
            console.log("PArticipantId adicionado = " + this.msg.participantId)
        }
      });
      console.log(this.msg)
    this.apiService.addMensagem(this.msg).subscribe(response => {
        console.log(response)
        alert("MensagemAdicionada")
        this.getEvento()
        //this.router.navigate(['/login']);
      
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

  addEvento(){
    this.evento.eventTypeId = "1"

    console.log(this.evento)
    this.apiService.addEvent(this.evento).subscribe(response => {
      console.log(response)
        alert("Evento Criado")
        this.modal.dismiss({
          retorno: true
        })
   }, error => {
     console.error(error);
    });
  }
  
  // delete(){
  //   this.apiService.deleteEvent(this.id)
  //   this.modal.dismiss({
  //     retorno: true
  //   })
  // }

}
