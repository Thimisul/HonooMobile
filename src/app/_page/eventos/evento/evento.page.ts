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

  participant: any = {};

  idParticipant = false

  isParticipant: boolean
  isOwner: boolean

  constructor(public modal: ModalController,
              public apiService: ApiService) { }

  ngOnInit() {
    if(this.id > 0){
    this.getEvento();

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

  updateEvento(){
    this.apiService.updateEvent(this.evento).subscribe(response => {
      console.log(response)
      alert(response.title + " Atualizado!" + JSON.stringify(response))
      this.modal.dismiss({
        retorno: true
      })
      
   }, error => {
     console.error(error);
    });
  }

  getParticipant(id){
    this.apiService.getParticipant(id).subscribe(response => {
      console.log(response)
      this.participant = response;
      console.log("this participant id " + this.participant.id)
    })
  }

  getEvento(){
    this.getUser()
    this.apiService.getEvent(this.id).subscribe(response => {
      this.evento = response
      console.log(response)
      this.possivelParticipant.eventoId = this.evento.id
      this.possivelParticipant.userId = localStorage.getItem("user_id")
      let keepGoing = true;
      this.evento.participant.forEach(part => {
        if(keepGoing){
            this.apiService.getParticipant(part.id).subscribe(async responsePart => {
              console.log(responsePart)
              this.participant = responsePart;
              if( this.possivelParticipant.eventoId ==  this.participant.eventoId
                      && this.possivelParticipant.userId == this.participant.userId){   
                      this.isParticipant = await true
                      this.idParticipant = this.participant.id 
                      this.getMensagens()
                      console.log("Participante? " + this.isParticipant)
                      keepGoing = false;
                      }else{
                        this.isParticipant = await false 
                        console.log("Participante? " + this.isParticipant)
                    }})
            
            }


        // this.getParticipant(part.id)
        // console.log("teste userId" + this.participant.eventoId)
        // if( this.possivelParticipant.eventoId ==  this.participant.eventoId
        //   && this.possivelParticipant.userId == this.participant.userId){   
        //    this.isParticipant = true 
        //    console.log("Participante? " + this.isParticipant)
        //    keepGoing = false;
        //   }else{
        //     this.isParticipant = false 
        //     console.log("Participante? " + this.isParticipant)
        // }}

          // if(this.possivelParticipant.userId == part.id){
        //   this.isParticipant = true
        //   this.getMensagens();
        //   console.log("Participante? " + this.isParticipant)
        // }else{
        //   this.isParticipant = false
        //   console.log("Participante? " + this.isParticipant)
      })
        if(this.possivelParticipant.userId == this.evento.user.id){
          this.isOwner = true
          console.log("Dono do Evento? " + this.isOwner)
        }else{
          this.isOwner = false
          console.log("Dono do Evento? " + this.isOwner)
        }
      
    })
    
  }

  getUser(){ 
    this.apiService.getUser().subscribe()
  }

  addMensagem(){
    console.log(this.msg.message)
      this.msg.participantId = this.idParticipant
    this.apiService.addMensagem(this.msg).subscribe(response => {
        console.log(response)
        this.msg.message = ''
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
  
  deleteEvent(){
    this.apiService.deleteEvent(this.id).subscribe(response => {
      this.modal.dismiss({
        retorno: true
      })
 }, error => {
   console.error(error);
  });
  }

}
