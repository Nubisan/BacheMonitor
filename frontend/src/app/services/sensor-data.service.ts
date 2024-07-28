import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SensorData {
  x: string;
  y: string;
  z: string;
  lat: number;
  lng: number;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private apiUrl = 'http://localhost:8000/get';

  constructor(private http: HttpClient) {}

  getSensorData(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(this.apiUrl);
  }

}