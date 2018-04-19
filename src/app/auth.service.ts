import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService implements OnInit {
  readonly ROOT_URL= environment.api_url;
  results: Object[];

  constructor(private http: HttpClient) {}

  authUser(credentials, type) {
    return this.http.post<any>(this.ROOT_URL + "/"+type+".php", credentials)
         .map(user => {
           //login successful if there's a jwt token in response
           if (user && user.token) {
             //store user details & token in local storage
             localStorage.setItem('currentUser', JSON.stringify(user));
           }
           return (user);
         });
  }

  registerUser(credentials) {
    
    return this.http.post<any>(this.ROOT_URL + "/register.php", credentials)
         .map(user => {
           //login successful if there's a jwt token in response
           if (user && user.token) {
             //store user details & token in local storage
             localStorage.setItem('currentUser', JSON.stringify(user));
           }
           return (user);
         });
  }

  resetPass(user) {
    return this.http.post<any>(this.ROOT_URL + "/reset.php", JSON.stringify(user))
      .map(res => {
        //activity post is successful of success == tru
        if (res && res.success == true) {
          //if success then return result
          return(res);    
        }
        return (res);
      });
  }


  logout() {
    //remove user from local storage
    localStorage.removeItem('currentUser');
  }

  ngOnInit() {
  }

}
