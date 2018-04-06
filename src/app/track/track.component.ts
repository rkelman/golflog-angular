import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivityService } from '../activity.service';
import { AlertService } from '../alert.service';
import { Observable, Subscription } from "rxjs";
import * as moment from 'moment';
//import { format } from 'path';

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
  private startTime:string = null;
  private watcher: Subscription = null;
  
  constructor(private userService: UserService,
              private activityService: ActivityService,
              private alertService: AlertService, 
              public datePipe: DatePipe) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.message = {success: true, 
                    msg: ""};
  }

  ngOnInit() { 
    this.activities = ["Putting", "Chipping", "Approach", "Full-Swing"];
    this.isRunning = false;
  }

  startTimer() {
    this.isRunning = true;
    if (this.formattedTime() == '0:00:00') {
      let startx = Date.now();
      this.startTime = this.datePipe.transform(startx, 'y-MM-dd hh:mm:ss');
      console.log('Start: '+this.startTime);
    }
    this.startAt = moment.now() - (this.time - this.startAt);
    this.watcher = Observable.timer(0,1000).subscribe(() => {
      this.time = moment.now();
    });
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
    this.startTime = null;
  }

  isWatching(): boolean {
    return this.watcher != null;
  }

  logout() {
    //remove user from local storage
    localStorage.removeItem('currentUser');
  }

  saveTimer(activity, notes) {
    //console.log('user id: '+this.currentUser.uid);
    //console.log('activity: '+activity);
    //console.log('notes: '+notes);
    //console.log('elapsed time: '+this.formattedTime());
    //console.log('token: '+this.currentUser.token);
    this.activityService.postActivity(this.currentUser.uid, this.formattedTime(), activity, notes, this.startTime, this.currentUser.token)
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
