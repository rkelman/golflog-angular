import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const router: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
