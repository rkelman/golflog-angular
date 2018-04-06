import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public request = {
    email: '',
    password: ''
  };

  public reqString: String = '';
  public logResult: any;

  public resultObj: any;
  /* = {
    email: '',
    firstname: '',
    lastname: '',
    uid: 0
  };*/
  
  constructor(private authService: AuthService, 
              private router: Router,
              private alertService: AlertService) { }

  loginUser(user, password){
    this.alertService.reset();
    //console.log('email: '+user);
    //console.log('password: '+password);
    this.reqString = '{ "email": "'+user+'", "password": "'+password+'" }';
    //console.log(this.reqString);

    this.authService.authUser(this.reqString, "login")
      .subscribe(data => {
        this.router.navigate(['/track']);
      },
      error => {
        this.alertService.error(error);
      });
  }

  ngOnInit() {
  }

}
