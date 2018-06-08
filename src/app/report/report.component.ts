import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivityService } from '../activity.service';
import { AlertService } from '../alert.service';
import { Observable, Subscription } from "rxjs";
import { Chart } from 'chart.js';
//import { Activity } from '../activity';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  currentUser: User;
  periods = [];
  activities = [];
  summary = [];
  //summary = {type: String, elapsedTime: String}[];
  message: {success: boolean, 
    msg: string};
  chart = [];

  constructor(private activityService: ActivityService,
              private alertService: AlertService) { 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.message = {success: true, 
        msg: ""};
  }

  ngOnInit() {
    this.periods = ["week", "month", "quarter", "year"];
    //this.getList();
    this.getSummary("month");
  }

  /*
  deleteActivity(activityID) {
    this.activityService.deleteActivity(activityID, this.currentUser.uid)
    .subscribe(data => this.message = data);

    this.getList();

    //this.getSummary();
  }*/

  /*
  getList(): void{
    this.activity,
    Service.getActivityList(this.currentUser.uid, this.currentUser.token, 10)
      .subscribe(data => this.activities = data);
  }*/

  getSummary(period) {
    this.activityService.getActivitySummary(this.currentUser.uid, this.currentUser.token, period)
      .subscribe(data => this.summary = data);

    this.activityService.getActivitySummary(this.currentUser.uid, this.currentUser.token, period)
      .subscribe(res => {
        let chartjsLabels = [];
        let chartjsData = [];
        for (var i = 0; i < res.length; i++) {
          chartjsLabels.push(res[i].type);  
          chartjsData.push(res[i].sumRawTime);  
          //console.log('Type '+i+': '+this.summary[i].type);
        }
        
        this.chart = [];
        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: chartjsLabels,
            datasets: [{
              backgroundColor: ["#3e95cd", "#ffcc00","#3cba9f"],
              data: chartjsData, 
              //labels: chartjsDataLabels
            }]
          },
          options: {
            title: {
              display: true,
              text: 'Your Golf Practice Summary'
            }
          }
        });

      });
/*
    let chartjsLabels = [];
    for (var i = 0; i < this.summary.length; i++) {
      chartjsLabels.push(this.summary[i].type);  
      //console.log('Type '+i+': '+this.summary[i].type);
    }
    //chartjsLabels = ["Putting", "Chipping", "Full-Swing", "Approach"];
    
    let chartjsData = [];
    for (var i = 0; i < this.summary.length; i++) {
      chartjsData.push(this.summary[i].sumRawTime);  
    }

    for (var i = 0; i < this.summary.length; i++) {
      chartjsData.push(this.summary[i].elapsedTime);  
    }
    let chartjsDataLabels = [];
    //chartjsData = ["14", "5", "5", "4"];
    console.log('Labels: '+chartjsLabels);
    console.log('Data: '+chartjsData);
    console.log('Data Labels: '+chartjsDataLabels);

    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        labels: chartjsLabels,
        datasets: [{
          backgroundColor: ["#3e95cd", "#ffcc00","#3cba9f"],
          data: chartjsData, 
          labels: chartjsDataLabels
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Your Golf Practice Summary'
        }
      }
    });*/
  }
}
