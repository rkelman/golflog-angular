import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req, next) {
    let tokenizedReq = req.clone({
      setHeaders: {
        Auth: 'Bearer xx.yy.zz'
      }
    })
    return next.handle(tokenizedReq)
  }
}
