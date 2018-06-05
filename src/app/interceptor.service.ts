import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { User } from '../app/user';


@Injectable()
export class InterceptorService implements HttpInterceptor {
  currentUser: User;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  intercept(req, next) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Auth: 'Bearer '+this.currentUser.token
      }
    })
    return next.handle(tokenizedReq)
  }
}
