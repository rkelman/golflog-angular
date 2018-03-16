import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { TrackComponent } from './track/track.component';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { UserService } from './user.service';
//import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent },
      {path: 'login', component: LoginComponent },
      {path: 'register', component: RegisterComponent },
      {path: 'reset', component: ResetComponent },
      {path: 'track', component: TrackComponent },
      {path: '**', component: LoginComponent }
  ])
  ],
  providers: [
    AuthService,
    AlertService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
