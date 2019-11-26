import { DatePipe } from '@angular/common';

export interface ParticipantResponse {
    
    participant: {
        userId: bigint,
        eventoId: bigint,
      }
      
}

export interface ParticipantIdResponse {
    
    participant: {
        id: bigint,
        userId: bigint,
        eventoId: bigint,
        registrationDate: DatePipe
      }
}
