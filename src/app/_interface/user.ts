import { DatePipe } from '@angular/common';

export interface UserResponse {
    token: string;
    status: string;
    birthdate: string;
    username: string;
    password: string;
    email: string;
    id: bigint;
}

export interface LoginResponse {
    token: string;
    status: string;
    user : { id: string, username: string;}
    
}