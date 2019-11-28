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
    id: bigint
    neighborhood: string,
    eventType: {
        id: bigint,
        name: string,

    },
    title: string,
    user: {
        birthdate: DatePipe,
        sex: string,
        id: bigint,
        email: string,
        username: string
    },
    starDate: DatePipe,
    referencePoint: string,
    status: boolean
}
