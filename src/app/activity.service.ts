import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class ActivityService {
  readonly ROOT_URL= environment.api_url;
  results: Object[];

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

  getActivitySummary(uid, token, timePeriod){

    return this.http.get<any>(this.ROOT_URL + "/activity.php?uid="+uid+"&type=summary&period="+timePeriod)
        .map(res => {
        //activity post is successful of success == tru
        if (res && res.success == true) {
          //if success then return result
          return(res);
        }
        return (res);
    });
  }

  getActivityList(uid, token, number){

    return this.http.get<any>(this.ROOT_URL + "/activity.php?uid="+uid+"&type=list&number="+number)
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
