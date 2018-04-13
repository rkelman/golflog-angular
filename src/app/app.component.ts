import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Golf Log Pro';
  //readonly ROOT_URL='http://golflog.daxhund.com';
  
  posts: any;

  constructor(private http: HttpClient) {}

}
