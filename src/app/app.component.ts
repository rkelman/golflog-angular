import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Golf Log Pro';
  //readonly ROOT_URL='http://golflog.daxhund.com';
  readonly ROOT_URL='http://jsonplaceholder.typicode.com';
  posts: any;

  constructor(private http: HttpClient) {}

  getPosts() {
    this.posts = this.http.get(this.ROOT_URL + '/posts');
  }

}
