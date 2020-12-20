import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
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

}
