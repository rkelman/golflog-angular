import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivityService } from '../activity.service';
import { AlertService } from '../alert.service';
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
  activities: string[] = [];
  isRunning: boolean;
  message: {success: boolean, 
            msg: string}; 
  
  private time = 0;
  private startAt = 0;
  private watcher: Subscription = null;
  
  constructor(private userService: UserService,
              private activityService: ActivityService,
              private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() { 
    this.activities = ["Putting", "Chipping", "Approach", "Full-Swing"];
    this.isRunning = false;
  }

  startTimer() {
    this.isRunning = true;
    this.startAt = moment.now() - (this.time - this.startAt);
    this.watcher = Observable.timer(0,1000).subscribe(() => {
      this.time = moment.now();
    });
    this.message.msg = "";
  }

  stopTimer(){
    this.watcher.unsubscribe();
    this.watcher = null;
    this.isRunning = false;
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

  logout() {
    //remove user from local storage
    localStorage.removeItem('currentUser');
  }

  saveTimer(activity) {
    //console.log('user id: '+this.currentUser.uid);
    //console.log('activity: '+activity);
    //console.log('elapsed time: '+this.formattedTime());
    //console.log('token: '+this.currentUser.token);
    this.activityService.postActivity(this.currentUser.uid, this.formattedTime(), activity, this.currentUser.token)
    .subscribe(data => {
      this.message = data;
    },
    error => {
      this.alertService.error(error);
    });
    this.resetTimer();
  }  
/*
  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
  */
}
