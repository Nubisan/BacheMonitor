import { inject, Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  private httpClient = inject(HttpClient);
  private apiUrl: string;

  constructor() { 
    this.apiUrl = 'http://localhost:3000/api/operator';
  }

  getId(): string | null {
    if(typeof localStorage !== 'undefined') {
      return localStorage.getItem('id');
    }
    return null;
  }

  getUser(userId: any){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.apiUrl}/${userId}`)
    );
  }

  updatePassword(id: any, password: string){
    return firstValueFrom(
      this.httpClient.put(`${this.apiUrl}/${id}`,  { password })
    );
  }



  
}
