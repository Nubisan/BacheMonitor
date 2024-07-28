import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: { '[attr.id]': "'app-component-id'" } 
})
export class AppComponent {
  title = 'frontend';

}
