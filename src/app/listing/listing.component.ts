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
  activities = [];
  message: {success: boolean, 
    msg: string};
    
  constructor(private activityService: ActivityService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getList();
  }

  deleteActivity(activityID) {
    this.activityService.deleteActivity(activityID, this.currentUser.uid)
    .subscribe(data => this.message = data);

    this.getList();
  }

  getList(): void{
    this.activityService.getActivityList(this.currentUser.uid, this.currentUser.token, 10)
      .subscribe(data => this.activities = data);
  }

}
