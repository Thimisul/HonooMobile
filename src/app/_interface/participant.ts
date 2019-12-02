import { DatePipe } from '@angular/common';

export interface ParticipantResponse {
    

        userId: string,
        eventoId: string,
      
      
}

export interface ParticipantIdResponse {
    
    
        id: string,
        userId: string,
        eventoId: string,
        registrationDate: string
    
}
