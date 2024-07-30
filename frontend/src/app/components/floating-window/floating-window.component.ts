import { Component } from '@angular/core';

@Component({
  selector: 'app-floating-window',
  templateUrl: './floating-window.component.html',
  styleUrl: './floating-window.component.css'
})
export class FloatingWindowComponent {

  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  setTheme(theme: string) {
    document.body.className = '';
    if (theme !== 'default') {
      document.body.classList.add(theme + '-theme');
    }
  }

  setTextSize(size: string) {
    document.body.className = '';
    if (size !== 'default') {
      document.body.classList.add(size + '-text');
    }
  }

}
