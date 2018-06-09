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
  message: {success: boolean, 
    msg: string};
  chart: Chart;

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
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {},
      options: {
        title: {
          display: true,
          text: 'Your Golf Practice Summary'
        }
      }
    });
  }

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
        
        this.chart.data = {
          labels: chartjsLabels,
          datasets: [{
            backgroundColor: ["#3e95cd", "#ffcc00","#3cba9f"],
            data: chartjsData,
            labels: chartjsLabels
          }]
        };
        this.chart.update();
      });
  }
}
