import { DatePipe } from '@angular/common';

export interface MensagemResponse {

        message: string,
        participantId: bigint
    
}

export interface MensagemEventoIdResponse {
    
        id: string,
        userId: string,
        username: string,
        messageDate: string,
        message: string
    
}