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

  postActivity(uid, elapsedTime, activity, notes, startTime, token) {
    let activitySet = {
      uid: uid,
      token: token,
      elapsedTime: elapsedTime,
      startTime: startTime,
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

  getActivitySummary(uid, token, timePeriod){
    console.log("url: "+this.ROOT_URL + "/activity.php?uid="+uid+"&type=summary");

    return this.http.get<Activity[]>(this.ROOT_URL + "/activity.php?uid="+uid+"&type=summary");
  }

  
  getActivityList(uid, token, number): Observable<Activity[]>{
    console.log("url: "+this.ROOT_URL + "/activity.php?uid="+uid+"&type=list&number="+number);

    //return this.http.get<Activity[]>(this.fakeURL);
    return this.http.get<Activity[]>(this.ROOT_URL + "/activity.php?uid="+uid+"&type=list&number="+number);    
  }

  deleteActivity(activityID, uid) {
    let activitySet = {
      uid: uid,
      activityID: activityID,
    }

    console.log(JSON.stringify(activitySet));

    return this.http.delete<any>(this.ROOT_URL + "/activity.php?uid="+uid+"&ActivityID="+activityID)
         .map(res => {
           //activity post is successful of success == tru
           if (res && res.success == true) {
             //if success then return result
             return(res);
           }
           return (res);
         });
  }

}
