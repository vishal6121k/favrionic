import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  showPage:any = 0;
  faqs:any;
  showCar:any = [];
  passModel:any = {};
  userDets:any = {};

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.getUserDetails();
  }

  getUserDetails() {
      this.api.getUserDetails()
          .then(resp => {
          this.userDets = resp;
          this.showPage = 1;
      })
          .catch(err => {
      });
  }

  changePw(){
    var data = this.passModel;
    data['email'] = this.userDets['email'];

    if(data['password'] == data['conf_password']){
      this.api.changePwNew(data)
      .then(resp => {
        console.log(resp);
        alert('Password changed succesfully');
        this.passModel = {};
      })
      .catch(err => {
        console.log(err);
      })
    }
    else{
      alert("Password and confirm password does not match.");
    }
  }

}