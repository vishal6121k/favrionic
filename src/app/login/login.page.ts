import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
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
export class LoginPage implements OnDestroy {
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

	resModel:any = {};

	backSub:any;
	
	forgModel:any = {};
	
	conf_password:any = "";
	
	signOtp:any = 0;
	
	otp:any = [];
	
	countries:any;
	
	redLogin:any = 0;

	signupPop:any = 0;
	forgPop:any = 0;
	
	redUrl:any = '/choose';
	
	redData:any = "";

	passResetBlock:any = 0;
	
	countryCode:any = "+353";
	
	constructor(private api: ApiService, private router: Router,
	 private firebase: FirebaseX,
		private platform: Platform) {
		// if(this.router.getCurrentNavigation().extras.state){
		//   if(this.router.getCurrentNavigation().extras.state.redirectAfterLogin){
		//     this.redLogin = 1;
		//     this.redData = this.router.getCurrentNavigation().extras.state.formVal;
		//     console.log(this.redData);
		//     this.redUrl = this.router.getCurrentNavigation().extras.state.redirectAfterLogin;
		//   }
		// }
	}

	ionViewDidEnter() {
		this.platform.ready().then(() => {
			this.registerBackAction();
			// alert('abc');
			console.log(window.localStorage.getItem('token'));
			this.api.getCountryList()
			.then(resp => {
				this.countries = resp;;
			})
			.catch(err => {

			});
		});
	}

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

	getTimeZone(dt) 
	{ 
		return /\((.*)\)/.exec(new Date().toString())[1];
	}

	firebaseTokenSet(){
		this.platform.ready().then(() => {

				this.firebase.setAutoInitEnabled(false)
				.then( resp => {
				    this.firebase.unregister();
				});
			
				this.firebase.getToken()
				.then(fbs_token => {
				    window.localStorage.setItem('fbs_token', fbs_token);
				    console.log(fbs_token);
				    var data = {
				      'fbs_token': fbs_token,
				      'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
				    };
						
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

				this.firebase.onTokenRefresh().subscribe(fbs_token => {
				  // Register your new token in your back-end if you want
				  // backend.registerToken(token);
				  window.localStorage.setItem('fbs_token', fbs_token);
				    console.log(fbs_token);
				    var data = {
				      'fbs_token': fbs_token,
				      'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
				    };
						
				   this.api.setUserFbToken(data)
				   .then( resp => {
				     console.log(resp);
				     // this.router.navigate([this.redUrl], { state: { formVal: this.redData } });
				   })
				   .catch( err =>{

				   });
				});
		
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
				// this.firebaseTokenSet();
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
					this.passResetBlock = 1;
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

	resetPass(){
		var data = this.resModel;
		data['email'] = this.forgModel.email;
		if(!( (data.password == "") || (data.new_password == "") || (data.re_password == "")  )){
			if(data.new_password == data.re_password){
				this.api.resetPw(data)
				.then( resp => {
					if(resp.status == 1){
						alert('Password changed');
						this.forgPop = 0;
						this.passResetBlock = 0;
					}
					if(resp.status == 2){
						alert('Email id does not exist');
					}
					if(resp.status == 3){
						alert('Password to email does not match');
					}
				})
				.catch( err => {

				});
			}
			else{
				alert("New password and re enter password dont match");
			}
		}
		else{
			alert('Please fill all fields');
		}
	}



	registerBackAction(){
		let a =0;
      	this.backSub = this.platform.backButton.subscribeWithPriority(9999, () => {
      		if(this.signupPop == 1){
      			this.signupPop = 0;
      		}
      		else if(this.forgPop == 1){
      			this.forgPop = 0;
      		}
      		else{
	      		a++;
	      		if(a == 1){
	    //   			this.toast.show('Press back again to exit..', '2000', 'bottom').subscribe(
					//   	toast => {
					//     	console.log(toast);
					//   	}
					// );
	      		}
		        if (a == 2) { // logic for double tap
		          navigator['app'].exitApp();
		        }
	        }
  		});
	}

	ionViewWillLeave(){
		this.backSub.unsubscribe();
	}
	ngOnDestroy(){
		this.backSub.unsubscribe();
	}





}
