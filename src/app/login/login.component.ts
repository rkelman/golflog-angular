import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  readonly ROOT_URL='http://golflog.daxhund.com';
  logResult: any;

  constructor(private http: HttpClient) { }

  loginUser(form){
    console.log(form.value);
    //const data: User = form.value;

    this.logResult = this.http.post(this.ROOT_URL + '/login.php', form)
    console.log(this.logResult);
  }

  ngOnInit() {
  }

}
