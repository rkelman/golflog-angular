import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivityService } from '../activity.service';
import { Observable, Subscription } from "rxjs";
import * as moment from 'moment';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  
  private time = 0;
  private startAt = 0;
  private watcher: Subscription = null;
  
  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {  }

  startTimer() {
    this.startAt = moment.now() - (this.time - this.startAt);
    this.watcher = Observable.timer(0,1000).subscribe(() => {
      this.time = moment.now();
    });
  }

  stopTimer(){
    this.watcher.unsubscribe();
    this.watcher = null;
  }

  formattedTime(): string{
    return moment.utc(this.time - this.startAt).format('H:mm:ss');
  }

  resetTimer() {
    this.time = 0;
    this.startAt = 0;
  }

  isWatching(): boolean {
    return this.watcher != null;
  }

/*
  saveTimer(activity) {
    submitActivity(this.currentUser.uid, this.formattedTime(), activity);
  }  

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
  */
}
