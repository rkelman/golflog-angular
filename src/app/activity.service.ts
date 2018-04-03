import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Activity } from './activity';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class ActivityService {
  readonly ROOT_URL= environment.api_url;
  results: Object[];
  private fakeURL: string = "/assets/mock-list.json";

  constructor(private http: HttpClient) { }

  postActivity(uid, elapsedTime, activity, notes, token) {
    let activitySet = {
      uid: uid,
      token: token,
      elapsedTime: elapsedTime,
      activity: activity,
      notes: notes
    }
    console.log(JSON.stringify(activitySet));

    return this.http.post<any>(this.ROOT_URL + "/activity.php", JSON.stringify(activitySet))
         .map(res => {
           //activity post is successful of success == tru
           if (res && res.success == true) {
             //if success then return result
             return(res);
           }
           return (res);
         });
  }
/*
  getActivitySummary(uid, token, timePeriod){

    return this.http.get<Activity>(this.ROOT_URL + "/activity.php?uid="+uid+"&type=summary&period="+timePeriod)
        .map(res => {
        //activity post is successful of success == tru
        //if (res && res.success == true) {
        if (res) {
          //if success then return result
          console.log(res);
          return(res);
        }
        return (res);
    });
  */
  getActivitySummary(uid, token, timePeriod){
    return [
      { "type": "Putting",
        "subType": "", 
        "elapsedTime": "02:08:00",
        "count":5
      }, 
      { "type": "Approach",
        "subType": "", 
        "elapsedTime": "00:59:02",
        "count":3
      },
      { "type": "Full-Swing", 
        "subType": "",
        "elapsedTime": "00:12:43", 
        "count":1
      }, 
      { "type": "Chipping",
        "subType": "",
        "elapsedTime": "00:05:20", 
        "count": 1
      }];
  }

  
  getActivityList(uid, token, number): Observable<Activity[]>{
    console.log("url: "+this.ROOT_URL + "/activity.php?uid="+uid+"&type=list&number="+number);

    //return this.http.get<Activity[]>(this.fakeURL);
    return this.http.get<Activity[]>(this.ROOT_URL + "/activity.php?uid="+uid+"&type=list&number="+number);
        /*.map(res => {
        //activity post is successful of success == tru
        if (res) {
          //if success then return result
          return(res);
        }
        return (res);*/
  }
  
/*
  getActivityList(uid, token, number):Activity[] {
    console.log("url: "+this.ROOT_URL + "/activity.php?uid="+uid+"&type=list&number="+number);
    return [
      { "type": "Putting",
        "subType": null, 
        "elapsedTime": "00:08:00", 
        "practiceDateTime": "2018-04-02 20:40:49", 
        "notes": null }, 
      { "type": "Putting",
        "subType": null, 
        "elapsedTime": "00:09:02", 
        "practiceDateTime": "2018-04-02 20:31:41", 
        "notes": "2x 4+" },
      { "type": "Putting", 
        "subType": null,
        "elapsedTime": "00:12:43", 
        "practiceDateTime": "2018-04-02 20:22:15", 
        "notes": null }, 
      { "type": "Approach",
        "subType": null,
        "elapsedTime": "00:05:20", 
        "practiceDateTime": "2018-04-02 19:29:43", 
        "notes": "contest w/ Sean" }
    ];
  }*/
}
