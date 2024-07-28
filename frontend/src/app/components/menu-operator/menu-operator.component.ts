import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SensorDataService, SensorData } from '../../services/sensor-data.service';
import * as XLSX from 'xlsx';

declare var google: any;

@Component({
  selector: 'app-menu-operator',
  templateUrl: './menu-operator.component.html',
  styleUrls: ['./menu-operator.component.css'],
  host: { '[attr.id]': "'menuOperador-component-id'" } 
})
export class MenuOperatorComponent implements OnInit { 

  sensorData: SensorData[] = [];
  fileName = 'Reporte.xlsx';

  constructor(private sensorDataService: SensorDataService) {}

  
  ngOnInit(): void {
    this.fetchSensorData();
  }
  
    
  fetchSensorData() {
    this.sensorDataService.getSensorData().subscribe(data => {
      this.sensorData = data;
    });
  }

  exportExcel(){
    let data = document.getElementById('tabla');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
  
}
