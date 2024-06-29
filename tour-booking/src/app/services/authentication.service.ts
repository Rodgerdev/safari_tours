import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegisterResponse, LoginReq, LoginResponse, AddUser } from '../models/user.model'; // Adjusted import path

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly BASE_URL = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) { }

  registerUser(newUser: AddUser): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.BASE_URL + 'register', newUser).pipe(
      catchError(this.handleError)
    );
  }

  loginUser(user: LoginReq): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.BASE_URL + 'login', user).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.isAdmin;
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.Sub;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
