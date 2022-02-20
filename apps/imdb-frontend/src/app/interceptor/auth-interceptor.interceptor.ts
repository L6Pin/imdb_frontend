import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) { }
  intercept(
    request: HttpRequest<any>,

    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!localStorage.getItem('token')) {
      return next.handle(request);
    }

    const authToken = localStorage.getItem('token');

    const authReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + authToken),
    });

    return next.handle(authReq);
  }
}
