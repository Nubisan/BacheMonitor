import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SensorDataService, SensorData } from '../../services/sensor-data.service';
import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
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
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
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

  exportPDF(){
    const docDefinition = {
      content: [
        {
          text: 'Reporte',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: ['10%', '10%', '10%', '20%', '20%', '30%'],
            body: [
              [
                { text: 'X', style: 'tableHeader' },
                { text: 'Y', style: 'tableHeader' },
                { text: 'Z', style: 'tableHeader' },
                { text: 'Latitud', style: 'tableHeader' },
                { text: 'Logitud', style: 'tableHeader' },
                { text: 'Fecha y Hora', style: 'tableHeader' }
              ],
              ...this.sensorData.map(datos => [datos.x, datos.y, datos.z, datos.lat, datos.lng, datos.time])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black',
          fillColor: '#cccccc'
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('reporte.pdf');
  };
}
