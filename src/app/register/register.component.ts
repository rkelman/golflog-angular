import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  readonly ROOT_URL='http://golflog.daxhund.com';
  newUser: any;

  constructor(private authService: AuthService, 
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  registerUser(regfrm) {
    console.log(regfrm.value);
  
    this.newUser = this.authService.registerUser(regfrm)
    .subscribe(data => {
      this.router.navigate(['/track']);
    },
    error => {
      this.alertService.error(error);
    });

    console.log(this.newUser);
  }
}
