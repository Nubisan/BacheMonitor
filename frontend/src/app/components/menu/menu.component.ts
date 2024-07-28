import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  host: { '[attr.id]': "'menu-component-id'" } 
})
export class MenuComponent implements OnInit, OnDestroy {

  authService = inject(AuthService);
  role: string | null = null;

  private authSubscription!: Subscription;

  ngOnInit() {
    this.role = this.authService.getRole();
    this.authSubscription = this.authService.authStatusChanged.subscribe(() => {
      this.role = this.authService.getRole();
    });
    console.log(this.role);
  }

  onLogout() {
    this.authService.onLogout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
