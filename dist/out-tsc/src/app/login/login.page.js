import { __decorate } from "tslib";
import { Component } from '@angular/core';
const axios = require('axios').default;
let LoginPage = /** @class */ (() => {
    let LoginPage = class LoginPage {
        constructor(api, router) {
            this.api = api;
            this.router = router;
            this.slideOpts = {
                speed: 400
            };
            this.otpsent = 0;
            this.signupModel = {};
            this.loginModel = {};
            this.conf_password = "";
            this.signOtp = 0;
            this.otp = [];
            this.redLogin = 0;
            this.redUrl = '/choose';
            this.redData = "";
            this.countryCode = "+353";
            if (this.router.getCurrentNavigation().extras.state) {
                if (this.router.getCurrentNavigation().extras.state.redirectAfterLogin) {
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
                this.countries = resp;
                ;
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
        otpKeyUp(event, prev, next) {
            console.log(event);
            if (event.key == 'Backspace') {
                if (!(prev == 0)) {
                    document.getElementById(prev).focus();
                }
            }
            else {
                if (event.keyCode >= 48 && event.keyCode <= 57) {
                    if (!(next == 0)) {
                        document.getElementById(next).focus();
                    }
                }
                else {
                    return false;
                }
            }
        }
        signupUser() {
            if (this.signupModel.password == this.conf_password) {
                var data = this.signupModel;
                this.api.signupUser(data)
                    .then(resp => {
                    console.log(resp.token);
                    window.localStorage.setItem('token', resp.token);
                    if (resp.token) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.token;
                    }
                    this.router.navigate([this.redUrl], { state: { formVal: this.redData } });
                })
                    .catch(err => {
                });
            }
            else {
                alert('Password and confirm password mismatch');
            }
        }
        loginUser() {
            if (this.signOtp == 1) {
                this.sendOtp();
            }
            else {
                var data = this.loginModel;
                this.api.loginUser(data)
                    .then(resp => {
                    console.log(resp.token);
                    if (resp.token != undefined) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.token;
                        window.localStorage.setItem('token', resp.token);
                        this.router.navigate([this.redUrl], { state: { formVal: this.redData } });
                    }
                    else {
                        alert('Invalid Credentials');
                    }
                })
                    .catch(err => {
                });
            }
        }
        sendOtp() {
            var data = this.loginModel;
            this.api.sendOtp(data)
                .then(resp => {
                if (resp.status == 1) {
                    this.otpsent = 1;
                }
            })
                .catch(err => {
            });
        }
        verifyOtp() {
            // console.log(JSON.stringify(this.otp));
            var otpStr = this.otp.join('');
            console.log(otpStr);
            var data = {
                email: this.loginModel.email,
                countryCode: this.loginModel.countryCode,
                otp: otpStr
            };
            this.api.verifyOtp(data)
                .then(resp => {
                if (resp.token != undefined) {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.token;
                    window.localStorage.setItem('token', resp.token);
                    this.router.navigate([this.redUrl], { state: { formVal: this.redData } });
                }
                else {
                    alert('Invalid Credentials');
                }
            })
                .catch(err => {
            });
        }
        guestLogin() {
            window.localStorage.setItem('user_role', '2');
            this.router.navigate(['shopper']);
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        })
    ], LoginPage);
    return LoginPage;
})();
export { LoginPage };
//# sourceMappingURL=login.page.js.map