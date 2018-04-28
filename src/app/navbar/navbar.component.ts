import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor() { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  } 
  ngOnInit() {

  }

}
