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
            msg: string};

  constructor(private authService: AuthService,
              private alertService: AlertService) { }

  ngOnInit() {
  }

  resetPassword(form) {
    console.log(form.value);

    this.authService.resetPass(JSON.stringify(form.value))
      .subscribe(data => {
        this.message = data;
    },
    error => {
      this.alertService.error(error, false);
    });  
  }

}
