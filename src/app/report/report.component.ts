import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivityService } from '../activity.service';
import { AlertService } from '../alert.service';
import { Observable, Subscription } from "rxjs";
//import { Activity } from '../activity';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  currentUser: User;
  //activities: Activity[];
  activities = [];
  summary = [];
  message: {success: boolean, 
    msg: string};

  constructor(private activityService: ActivityService,
              private alertService: AlertService) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.message = {success: true, 
        msg: ""};
  }

  ngOnInit() {
    this.getList();
    this.getSummary();
  }

  deleteActivity(activityID) {
    this.activityService.deleteActivity(activityID, this.currentUser.uid)
    .subscribe(data => this.message = data);

    this.getList();

    this.getSummary();
  }

  getList(): void{
    this.activityService.getActivityList(this.currentUser.uid, this.currentUser.token, 10)
      .subscribe(data => this.activities = data);
  }

  getSummary() {
    this.activityService.getActivitySummary(this.currentUser.uid, this.currentUser.token, 'month')
    .subscribe(data => this.summary = data);
  }
}
