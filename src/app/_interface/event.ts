import { DatePipe } from '@angular/common';



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
        birthdate: DatePipe,
        sex: string,
        id: string,
        email: string,
        username: string
    },
    starDate: DatePipe,
    referencePoint: string,
    status: boolean

}
