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

  constructor(private activityService: ActivityService,
              private alertService: AlertService) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.summary = this.activityService.getActivitySummary(this.currentUser.uid, this.currentUser.token, 'month');
    this.activityService.getActivityList(this.currentUser.uid, this.currentUser.token, 10)
      .subscribe(data => this.activities = data);
  }

  getSummary() {

  }

  getList(): void{
/*    this.activityService.getActivityList(this.currentUser.uid, this.currentUser.token, 10)
      .subscribe(resp => 
      {
          this.activities = resp;
          console.log(this.activities);
          console.log(JSON.parse(resp))
      },
        error => {
          this.alertService.error(error);
      });*/
  }
}
