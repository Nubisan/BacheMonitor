// import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { CanvasJSAngularChartsModule, CanvasJS } from '@canvasjs/angular-charts';
// import { SensorDataService } from '../../services/sensor-data.service';
// import { CommonModule } from '@angular/common';
// import * as L from 'leaflet';

// interface SensorData {
//   x: string;
//   y: string;
//   z: string;
//   lat: number;
//   lng: number;
// }

// @Component({
//   selector: 'app-sensor-data',
//   templateUrl: './sensor-data.component.html',
//   styleUrls: ['./sensor-data.component.css'],
//   standalone: true,
//   imports: [CommonModule, CanvasJSAngularChartsModule]
// })
// export class SensorDataComponent implements OnInit {
//   xValue: string = '';
//   yValue: string = '';
//   zValue: string = '';
//   latValue: string = '';
//   lngValue: string = '';

//   dataX: any[] = [];
//   dataY: any[] = [];
//   dataZ: any[] = [];
//   chart: any;
//   map: any;
//   marker: any;
//   updateInterval: number = 2000;
//   time: Date = new Date();

//   constructor(
//     private sensorDataService: SensorDataService,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {}

//   ngOnInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       this.initializeChart();
//       this.initializeMap();
//       this.updateChart();
//       setInterval(() => this.updateChart(), this.updateInterval);
//     }
//   }

//   initializeChart(): void {
//     this.chart = new CanvasJS.Chart("chartContainer", {
//       zoomEnabled: true,
//       title: {
//         text: "Valores de X, Y, Z"
//       },
//       toolTip: {
//         shared: true
//       },
//       axisX: {
//         title: "Actualización cada 2 segundos"
//       },
//       data: [
//         {
//           type: "line",
//           xValueType: "dateTime",
//           showInLegend: true,
//           name: "x",
//           dataPoints: this.dataX
//         },
//         {
//           type: "line",
//           xValueType: "dateTime",
//           showInLegend: true,
//           name: "y",
//           dataPoints: this.dataY
//         },
//         {
//           type: "line",
//           xValueType: "dateTime",
//           showInLegend: true,
//           name: "z",
//           dataPoints: this.dataZ
//         }
//       ],
//     });
//   }

//   initializeMap(): void {
//     this.map = L.map('map').setView([0, 0], 13);

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(this.map);

//     this.marker = L.marker([0, 0]).addTo(this.map);
//   }

//   updateChart(): void {
//     this.sensorDataService.getSensorData().subscribe((data: SensorData[]) => {
//       if (data.length > 0) {
//         const latestData = data[data.length - 1];
//         this.xValue = latestData.x;
//         this.yValue = latestData.y;
//         this.zValue = latestData.z;
//         this.latValue = latestData.lat.toString();
//         this.lngValue = latestData.lng.toString();

//         this.time.setTime(this.time.getTime() + this.updateInterval);
//         const yXVal = parseInt(latestData.x);
//         const yYVal = parseInt(latestData.y);
//         const yZVal = parseInt(latestData.z);

//         this.dataX.push({ x: this.time.getTime(), y: yXVal });
//         this.dataY.push({ x: this.time.getTime(), y: yYVal });
//         this.dataZ.push({ x: this.time.getTime(), y: yZVal });

//         this.chart.render();

//         this.marker.setLatLng([latestData.lat, latestData.lng]);
//         this.map.setView([latestData.lat, latestData.lng], 13);
//       }
//     });
//   }
// }
