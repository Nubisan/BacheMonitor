import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sensordata',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sensordata.component.html',
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
export class SensordataComponent {}
