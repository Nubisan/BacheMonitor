import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Define la interfaz de datos del sensor
export interface SensorData {
  x: number;
  y: number;
  z: number;
  lat: number;
  lng: number;
  fecha_hora: string;
}

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private apiUrl = 'http://35.175.228.149:8000/get'; // URL de la API

  constructor(private http: HttpClient) {}

  getSensorData(): Observable<SensorData[]> {
    return this.http.get<{ [key: string]: SensorData }>(this.apiUrl).pipe(
      map(data => {
        // Convierte el objeto recibido en un array
        return Object.keys(data).map(key => data[key]);
      })
    );
  }
}
