import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  message: {success: boolean, 
            msg: string
            step: Number };

  constructor(private authService: AuthService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.message = { 
      success: true,
      msg: '',
      step: 0
    }
  }

  resetPassword(resetform) {
    console.log('email: '+JSON.stringify(resetform));

    this.authService.resetPass(JSON.stringify(resetform))
      .subscribe(data => {
        this.message = data;
    },
    error => {
      this.alertService.error(error);
    });  
  }
 
}
