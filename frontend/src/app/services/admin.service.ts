import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private httpClient = inject(HttpClient);
  private apiUrl: string;
  private router = inject(Router);

  constructor() { 
    this.apiUrl = 'http://localhost:3000/api/admin';
  }

  register(userData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/registro`, userData); 
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/users`);
  }

  getById(userId: String){
    return firstValueFrom(
      this.httpClient.get<any>(`${this.apiUrl}/${userId}`)
    );
  }

  update(userId: string, formValues: any){
    return firstValueFrom(
      this.httpClient.put(`${this.apiUrl}/${userId}`, formValues)
    );
  }

  deleteById(userId: String){
    return firstValueFrom(
      this.httpClient.delete<any>(`${this.apiUrl}/${userId}`)
    )
  }
}
