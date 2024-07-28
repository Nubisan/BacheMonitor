import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class authInterceptor implements HttpInterceptor  {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): 
  Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const role = this.authService.getRole();

    const headersConfig: { [name: string]: string } = {};

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    if (role) {
      headersConfig['Role'] = role;
    }

    const cloned = req.clone({
      setHeaders: headersConfig
    });

    return next.handle(cloned);
  }
};
