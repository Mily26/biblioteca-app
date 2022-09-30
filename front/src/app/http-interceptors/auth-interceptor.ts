import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      if(req.url.indexOf("lending") == -1) {
        return next.handle(req);
      }
      else {
        return this.authService.$user.pipe(
          switchMap(user => {
            const newRequest = req.clone({
              setHeaders: {
                "x-user-id": user.id.toString()
              }
            });

            return next.handle(newRequest);
          })
        )
      }
  }
}