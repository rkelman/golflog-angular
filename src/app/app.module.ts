import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Chart } from 'chart.js';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { TrackComponent } from './track/track.component';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { ActivityService } from './activity.service';
import { AlertComponent } from './alert/alert.component';
import { ReportComponent } from './report/report.component';
import { ListingComponent } from './listing/listing.component';
//import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ReportComponent,
    ResetComponent,
    TrackComponent,
    AlertComponent,
    ReportComponent,
    ListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent },
      {path: 'login', component: LoginComponent },
      {path: 'register', component: RegisterComponent },
      {path: 'report', component: ReportComponent},
      {path: 'listing', component: ListingComponent },
      {path: 'reset', component: ResetComponent },
      {path: 'track', component: TrackComponent },
      {path: '**', component: LoginComponent }
  ])
  ],
  providers: [
    AuthService,
    AlertService,
    UserService, 
    ActivityService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
