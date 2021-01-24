import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	user_type:any;
  userDets:any;
  showPage:any = 0;
  chatOpen:any = 0;
  messages:any;
  chatModel:any = {};
  chatFile:any = "";
  	constructor(private router: Router, private api: ApiService, private firebase: FirebaseX, private _ngZone: NgZone) { }

  	ngOnInit() {
      this.getUserDetails();
      this.firebase.onMessageReceived()
        .subscribe(data => {
            var messagebody = JSON.parse(data.message);
            console.log(messagebody);
            // if(messagebody.type == 'order_update'){
            //   this.getOrderDetails();
            // }
              if(messagebody.type == 'received_message'){
                
                this._ngZone.run(() => {
                  this.getMessages();
                });
            }
        });
    }

    getUserDetails(){
      this.api.getUserDetails()
      .then(resp => {
        this.userDets = resp;
        this.user_type = resp.role_id;
        this.showPage = 1;
        this.messages = JSON.parse(resp.admin_msgs);
      })
      .catch(err => {

      });
    }

  	segmentChanged(event){

    }

  	logoutUser(){
  		window.localStorage.removeItem('user_type');
      window.localStorage.removeItem('token');
  		this.router.navigate(['/']);
  	}

    changeUserRole(){
      this.api.switchRole()
      .then(resp => {
        // console.log(resp);
        alert(resp.message);
        window.localStorage.setItem('user_type', resp.result.role_id);
        if(resp.result.role_id == 2){
          this.router.navigate(['/shopper']);
        }
        else{
          this.router.navigate(['/dropper']);
        }
      })
      .catch(err => {

      });
    }
  sendMessage(){
    // var data = this.chatModel;
    // data['to'] = 'admin';
    if(this.chatModel.message == "" && this.chatFile == ""){
      alert('Message cannot be empty');
      return;
    }
    let fd= new FormData();
    fd.append('to', 'admin');
    fd.append('message', this.chatModel.message);
    if(!(this.chatFile == "")){
      fd.append('file', this.chatFile);
    }
    else{
      fd.append('file', '');
    }
    console.log(fd);
    this.api.sendMessageToAdmin(fd)
    .then(resp =>{
      this.chatModel.message = "";
      this.chatFile = "";
      this.getMessages();
    })
    .catch(err => {

    });
  }
  onChange(files) {
    this.chatFile = files[0];
  }

  getMessages(){
    var data = {};
    this.api.getMessagesFromAdmin(data)
    .then(resp =>{
      this.messages = resp.messages;
    })
    .catch(err => {

    });
  }

    // user_type = (user_type==2)?3:2

}
