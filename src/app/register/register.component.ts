import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  readonly ROOT_URL='http://golflog.daxhund.com';
  newUser: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  registerUser(regfrm) {
    console.log(regfrm.value);
    const data: User = regfrm.value;

    this.newUser = this.http.post(this.ROOT_URL + '/register.php', data)
    console.log(this.newUser);
  }
}
