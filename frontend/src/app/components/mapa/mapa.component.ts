import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: `
    :host {
      display: block;
    }
    /* sensordata.component.css */
    #container {
      position: relative;
    }

    #embedded-content {
      width: 100%;
      height: 900px; 
      border: none;
      position: absolute;
      top: 100px; 
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapaComponent {

}
