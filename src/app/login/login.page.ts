import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

declare var require: any;
const axios = require('axios').default;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	slideOpts:any = {
    speed: 400
  };
  otpsent:any =0;
  signupModel:any = {
    countryCode: "+353"
  };
  loginModel:any = {
    countryCode: "+353"
  };
  forgModel:any = {};
  conf_password:any = "";
  signOtp:any = 0;
  otp:any = [];
  countries:any;
  redLogin:any = 0;
  redUrl:any = '/choose';
  redData:any = "";
  countryCode:any = "+353";
  constructor(private api: ApiService, private router: Router, private firebase: FirebaseX) {
    if(this.router.getCurrentNavigation().extras.state){
      if(this.router.getCurrentNavigation().extras.state.redirectAfterLogin){
        this.redLogin = 1;
        this.redData = this.router.getCurrentNavigation().extras.state.formVal;
        console.log(this.redData);
        this.redUrl = this.router.getCurrentNavigation().extras.state.redirectAfterLogin;
      }
    }
  }

  ngOnInit() {
    // alert('abc');
    console.log(window.localStorage.getItem('token'));
    this.api.getCountryList()
    .then(resp => {
      this.countries = resp;;
    })
    .catch(err => {

    });
  }

  // ionViewWillEnter(){
  //   if(this.router.getCurrentNavigation().extras.state){
  //     if(this.router.getCurrentNavigation().extras.state.redirectAfterLogin){
  //       this.redLogin = 1;
  //       this.redData = this.router.getCurrentNavigation().extras.state.formVal;
  //       console.log(this.redData);
  //       this.redUrl = this.router.getCurrentNavigation().extras.state.redirectAfterLogin;
  //     }
  //   }
  // }

  otpKeyUp(event, prev, next){
    console.log(event);
    if(event.key == 'Backspace'){
      if(!(prev == 0)) {
        document.getElementById(prev).focus();
      }
    }
    else{
      if(event.keyCode >= 48 && event.keyCode <= 57){
        if(!(next == 0)) {
          document.getElementById(next).focus();
        }
      }
      else{
        return false;
      }
    }
  }

  signupUser(){
    if(this.signupModel.password == this.conf_password){
      var data = this.signupModel;
      this.api.signupUser(data)
      .then( resp => {
        console.log(resp.token);
        window.localStorage.setItem('token', resp.token);
        if(resp.token != undefined){
          axios.defaults.headers.common['Authorization'] = 'Bearer '+ resp.token;
          this.firebaseTokenSet();
        }
        // this.router.navigate([this.redUrl], { state: { formVal: this.redData } });
      })
      .catch( err => {

      });
    }
    else{
      alert('Password and confirm password mismatch');
    }
  }

  loginUser(){
    if(this.signOtp == 1){
      this.sendOtp();
    }
    else{
      var data = this.loginModel;
      this.api.loginUser(data)
      .then( resp => {
        console.log(resp.token);
        if(resp.token != undefined){
          axios.defaults.headers.common['Authorization'] = 'Bearer '+ resp.token;
          window.localStorage.setItem('token', resp.token);
          this.firebaseTokenSet();
        }
        else{
          alert('Invalid Credentials');
        }
      })
      .catch( err => {

      });
    }
  }

  firebaseTokenSet(){
    this.firebase.setAutoInitEnabled(false)
    .then( resp => {
        console.log("Auto init has been disabled ");
        this.firebase.unregister();
    });
    // var fbs_token;
    // if(fbs_token = window.localStorage.getItem('fbs_token')){
    //   this.firebase.deleteToken(fbs_token)
    //   .then()
    //   .catch(err => {

    //   })
    // }
    this.firebase.getToken()
    .then(token => {
        window.localStorage.setItem('fbs_token', token);
        console.log(token);
        var data = {
          'fbs_token': token
        }
       this.api.setUserFbToken(data)
       .then( resp => {
         console.log(resp);
         this.router.navigate([this.redUrl], { state: { formVal: this.redData } });
       })
       .catch( err =>{

       });
    })
    .catch( err => {

    });
  }

  sendOtp(){
    var data = this.loginModel;
    this.api.sendOtp(data)
    .then( resp => {
      if(resp.status == 1){
        this.otpsent = 1;
      }
    })
    .catch( err => {

    });
  }


  verifyOtp(){
    // console.log(JSON.stringify(this.otp));
    var otpStr = this.otp.join('');
    console.log(otpStr);
    var data = {
      email: this.loginModel.email,
      countryCode: this.loginModel.countryCode,
      otp: otpStr
    };
    this.api.verifyOtp(data)
    .then( resp => {
      if(resp.token != undefined){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ resp.token;
        window.localStorage.setItem('token', resp.token);
        this.firebaseTokenSet();
        // this.router.navigate([this.redUrl], { state: { formVal: this.redData } });
      }
      else{
        alert('Invalid Credentials');
      }
    })
    .catch( err => {

    });
  }

  guestLogin(){

    window.localStorage.setItem('user_role', '2');
    this.router.navigate(['shopper']);
  
  }


  forgPw(){
    if(!(this.forgModel.email == "")){
      var data = this.forgModel;
      this.api.forgPw(data)
      .then( resp => {
        if(resp.status == 1){
          alert('Password sent to email');
        }
        if(resp.status == 2){
          alert('Email id does not exist');
        }
      })
      .catch( err => {

      });
    }
    else{
      alert('Enter email');
    }
  }



}
