import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from '../_interface/user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private router: Router,
    private http: HttpClient) { }

    urlBase = 'http://192.168.1.66:3000'
    // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
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

  // Verify user credentials on server to get token
  loginForm(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.urlBase + '/user/login', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

    // After login save token and other values(if any) in localStorage
  setUser(resp: LoginResponse) {
    localStorage.setItem('user_id', resp.user.id);
    localStorage.setItem('username', resp.user.username);
    localStorage.setItem('token', resp.token);
    this.router.navigate(['tabs/index'])
  }
 
  // Checking if token is set
  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  // After clearing localStorage redirect to login screen
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // Get data from server for Dashboard
  getData(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.urlBase + '/user/login', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
