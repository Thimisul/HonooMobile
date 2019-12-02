import { DatePipe } from '@angular/common';

export interface addEventoResponse{
    startDate: DatePipe,
    endDate: DatePipe,
    title: string,
    street: string,
  neighborhood: string,
  city: string,
  referencePoint: string,
  description: string,
  eventTypeId: string,
  ownerId: string,
  status: boolean
}


export interface EventResponse {
    
    participant: [
        {
            id: string
            username: string
            registrationDate: DatePipe
        }
    ],
    endDate: DatePipe,
    city: string,
    street: string,
    description: string,
    id: string
    neighborhood: string,
    eventType: {
        id: string,
        name: string,

    },
    title: string,
    user: {
        birthdate: string,
        sex: string,
        id: string,
        email: string,
        username: string
    },
    starDate: string,
    referencePoint: string,
    status: boolean
    eventTypeId: string

}


