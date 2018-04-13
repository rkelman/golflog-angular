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
  counts
  activities = [];
  message: {success: boolean, 
    msg: string};

  constructor(private activityService: ActivityService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.counts = ["10", "20", "40"];
    this.getList(10);
  }

  deleteActivity(activityID, count) {
    this.activityService.deleteActivity(activityID, this.currentUser.uid)
    .subscribe(data => this.message = data);

    this.getList(count);
  }

  getList(count: number): void{
    this.activityService.getActivityList(this.currentUser.uid, this.currentUser.token, 10)
      .subscribe(data => this.activities = data);
  }

}
