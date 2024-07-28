import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  private httpClient = inject(HttpClient);
  private apiUrl: string;
  router = inject(Router);

  authStatusChanged = new Subject<void>();

  constructor() {
    this.apiUrl = 'http://localhost:3000/api';
  }

  login(userData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/ingreso`, userData);
  }

  isLogged(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  setToken(token: string, role: string, user_id: string){
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('id',user_id);
      this.authStatusChanged.next();
    }    
  }

  getToken(): string | null {
    if(typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  getRole(): string | null {
    if(typeof localStorage !== 'undefined') {
      return localStorage.getItem('role');
    }
    return null;
  }

  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    this.authStatusChanged.next();
    this.router.navigate(['/home']);
  }

  canActivate(): boolean {
    const token = this.getToken();

    if (token) {
      return true; // Permite el acceso si hay un token
    } else {
      this.router.navigate(['/login']); // Redirige a login si no hay token
      return false; // Bloquea el acceso
    }
  }
}
