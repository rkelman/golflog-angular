import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';
import { TrackComponent } from './track/track.component';
import { ReportComponent } from './report/report.component';
import { ListingComponent } from './listing/listing.component';

export const router: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent },
    {path: 'track', component: TrackComponent },
    {path: 'reset', component: ResetComponent },
    {path: 'report', component: ReportComponent },
    {path: 'listing', component: ListingComponent },
    {path: 'register', component: RegisterComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
