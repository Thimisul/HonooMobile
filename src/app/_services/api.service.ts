import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { UserResponse } from '../_interface/user';
import { catchError } from 'rxjs/operators';
import { EventResponse } from '../_interface/event';
import { ParticipantResponse, ParticipantIdResponse } from '../_interface/participant';
import { MensagemResponse, MensagemEventoIdResponse } from '../_interface/mensagem';
import { TipoEventoResponse } from '../_interface/tipo-evento';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  token = ''
  auxStartDate= ''
  auxEndDate = ''
  auxEventType= ''

  constructor(
    private http: HttpClient) {  }

    urlBase = 'http://192.168.1.66:3000'
  
    // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': ''
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      alert(error.error.message)
    } else {
      alert(error.statusText + " : " + error.status + " :" + JSON.stringify(error.error))
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  //####################### CRUD USER #############################
  // POST /USER
  addUser(data): Observable<UserResponse> {
    return this.http
      .post<UserResponse>( this.urlBase + '/user/', data)
      .pipe(
        catchError(this.handleError)
      );
  }
  // PUT / USER
  updateUser(data):Observable<UserResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http
      .put<UserResponse>( this.urlBase + '/user/', data , httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // DELETE /USER
  deleteUser(): Observable<UserResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
     return this.http
       .delete<UserResponse>( this.urlBase + '/user/' + localStorage.getItem('user_id'), httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
    // GET USER
  getUser(): Observable<UserResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
     return this.http
       .get<UserResponse>( this.urlBase + '/user/' + localStorage.getItem('user_id'), httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }

   //######################## Events #######################################

   // GET /EVENT
  getEvents(): Observable<EventResponse>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http
       .get<EventResponse>( this.urlBase + '/event', httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
   //POST /EVENT
  addEvent(data): Observable<EventResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http
      .post<EventResponse>( this.urlBase + '/event/', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // PUT /EVENT
  updateEvent(data):Observable<EventResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http
      .put<EventResponse>( this.urlBase + '/event/', data , httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // GET /EVENT/{EVENTID}
  getEvent(id): Observable<EventResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
     return this.http
       .get<EventResponse>( this.urlBase + '/event/' + id , httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
  // DELETE /EVENT{EVENTID}
  deleteEvent(id): Observable<EventResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
     return this.http
       .delete<EventResponse>( this.urlBase + '/event/' + id , httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
   // GET /EVENT/SEARCH search?start_date=2019-11-07T18%3A46%3A29.648Z&end_date=2019-11-07T18%3A46%3A29.648Z&event_type=1
   getEventSearch(startDate, endDate, eventType): Observable<EventResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    if(startDate != undefined){
      this.auxStartDate = 'start_date=' + startDate
    }
    if(endDate != undefined){
     this.auxEndDate = '&end_date=' + endDate
    }
    if(eventType != undefined){
      this.auxEventType = '&event_type=' + eventType
    }
     return this.http
       .get<EventResponse>( this.urlBase  + '/event/search?' 
                                          +  this.auxStartDate
                                          +  this.auxEndDate
                                          +  this.auxEventType, httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
   //######################## Participants #######################################

   // POST /PARTICIPANT
   addParticipant(data): Observable<ParticipantResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http
      .post<ParticipantResponse>( this.urlBase + '/participant/', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // GET /PARTICIPANT/PARTICIPANTID
  getParticipant(id): Observable<ParticipantIdResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
     return this.http
       .get<ParticipantIdResponse>( this.urlBase + '/participant/' + id , httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
   // DELETE /PARTICIPANT{PARTIIPANTID}
  deleteParticipant(id): Observable<ParticipantResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
     return this.http
       .delete<ParticipantResponse>( this.urlBase + '/participant/' + id , httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }

    //######################## MENSAGEM #######################################

   // POST /MENSAGEM
   addMensagem(data): Observable<MensagemResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http
      .post<MensagemResponse>( this.urlBase + '/mensagem/', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // PUT /MENSAGEM
  updateMensagem(data):Observable<MensagemResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
    return this.http
      .put<MensagemResponse>( this.urlBase + '/mensagem/', data , httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // GET /MENSAGEM/EVENTO/{EVENTOID}
  getMensagemEvento(id): Observable<MensagemEventoIdResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
     return this.http
       .get<MensagemEventoIdResponse>( this.urlBase + '/mensagem/evento/' + id , httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
    // DELETE /MENSAGEM{MENSAGEMID}
  deleteMensagem(id): Observable<MensagemResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
     return this.http
       .delete<MensagemResponse>( this.urlBase + '/mensagem/' + id , httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
   // GET /TIPOEVENTO
  getTipoEventos(): Observable<TipoEventoResponse> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
     return this.http
       .get<TipoEventoResponse>( this.urlBase + '/tipoEvento/' , httpOptions)
       .pipe(
         catchError(this.handleError)
       );
   }
}