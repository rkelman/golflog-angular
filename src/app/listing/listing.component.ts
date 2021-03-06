import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivityService } from '../activity.service';
import { AlertService } from '../alert.service';
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  currentUser: User;
  counts = [];
  activities = [];
  message: {success: boolean, 
    msg: string};
  currCount: number;
  deletedRow: number;

  constructor(private activityService: ActivityService,
    private alertService: AlertService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.message = {success: true, 
        msg: ""};
  }

  ngOnInit() {
    this.counts = ["10", "20", "40"];
    this.currCount = 10;
    this.getList(this.currCount);
  }

  deleteActivity(activityID, index) {    
    this.deletedRow = index;
    //console.log("Deleting Row "+index);
    this.activityService.deleteActivity(activityID, this.currentUser.uid, this.currentUser.token)
    .subscribe(data => {
        if (data) {
          this.getList(this.currCount);
          //console.log("Completed Delete");
          this.deletedRow = null;
        } 
      });
  }

  getList(count: number): void{
    //console.log("getList: "+ count);
    this.currCount = count;
    this.activityService.getActivityList(this.currentUser.uid, this.currentUser.token, count)
      .subscribe(data => this.activities = data);
  }

}
