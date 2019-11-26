import { DatePipe } from '@angular/common';

export interface MensagemResponse {
    
    mensagem: {
        message: string,
        participantId: bigint
    }
}

export interface MensagemEventoIdResponse {
    
    mensagem: {
        id: bigint,
        userId: bigint,
        username: string,
        messageDate: DatePipe,
        message: string
      }
}