import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NotifyService } from '../services/notify.service';
import { MiscService } from '../services/misc.service';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { LoadingController } from '@ionic/angular';

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
	loading:any;
	chatFile:any = "";
	editName:any = 0;
	editEmail:any = 0;
	editPhone:any = 0;
	@ViewChild('loccartt' /* #name or Type*/, {static: false}) loccartt;
	@ViewChild('loccart' /* #name or Type*/, {static: false}) loccart;
	ProdImgUrl:any = "http://admin.favr.ie/uploads/";
		constructor(private router: Router, private notify: NotifyService, private api: ApiService, private misc: MiscService, public loadingController: LoadingController, 
			private firebase: FirebaseX, 
			private _ngZone: NgZone) { }
		ngOnInit(){
			
		}
		ionViewDidEnter() {
			this.getUserDetails();
			this.firebase.onMessageReceived()
			  .subscribe(data => {
			      var messagebody = JSON.parse(data.message);
			      console.log(messagebody);
			      // if(messagebody.type == 'order_update'){
			      //   this.getOrderDetails();
			      // }

				    if(data.tap != undefined && !(window.location.pathname == '/'+messagebody.action_url)){
				      this.router.navigate(['/'+messagebody.action_url]);
				    }
				    else if(data.tap == undefined && !(window.location.pathname == '/'+messagebody.action_url)){
				      this.notify.notify(data);
				    }

			        if(messagebody.type == 'received_message'){
			          this._ngZone.run(() => {
			            this.getMessages();
			          });
			      }
			  });
		}

		getUserDetails(){
			this.userDets = this.misc.getUserDets();
			this.user_type = this.userDets.role_id;
			this.messages = JSON.parse(this.userDets.admin_msgs);
			this.showPage = 1;
			this.dismissLoading();
			// this.api.getUserDetails()
			// .then(resp => {
			//   this.userDets = resp;
			//   this.user_type = resp.role_id;
			//   this.showPage = 1;
			//   this.messages = JSON.parse(resp.admin_msgs);
			//   this.dismissLoading();
			// })
			// .catch(err => {

			// });
		}

		segmentChanged(event){

		}

		updateUser(){
			this.presentLoading();
			var data = this.userDets;
			this.api.updateUser(data)
			.then(resp => {
				this.getUserDetails();
				// this.dismissLoading();
			})
			.catch(err => {

			});
			this.editName = 0
		}

		logoutUser(){
			this.api.logout()
			.then(response => {
				window.localStorage.removeItem('user_type');
				window.localStorage.removeItem('user');
				window.localStorage.removeItem('token');
				this.router.navigate(['/']);
			})
			.catch(err => {

			});
		}

		changeUserRole(){
			this.presentLoading();
			this.api.switchRole()
			.then(resp => {
				this.misc.setUserDets(JSON.stringify(resp.result));
				// console.log(resp);
				alert(resp.message);
				this.user_type = resp.result.role_id;
				window.localStorage.setItem('user_type', resp.result.role_id);
				this.dismissLoading();
				// if(resp.result.role_id == 2){
					// this.router.navigate(['/shopper']);
				// }
				// else{
					// this.router.navigate(['/dropper']);
				// }
			})
			.catch(err => {
				this.dismissLoading();

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

	onDpChange(files){
		let fd= new FormData();
		let newDp = files[0];
		console.log(newDp);
		if(!(newDp == "")){
			fd.append('file', newDp);
			// var imgHolder = document.getElementById('userDp');
			// imgHolder.attr('src', );
			// this.userDets.image_url = URL.createObjectURL(newDp);
			this.presentLoading();
			this.api.changeDp(fd)
			.then( resp => {
				this.getUserDetails();
				if(this.user_type == 2){
					this.loccart.getUserDetails();
				}
				else{
					this.loccartt.getUserDetails();
				}
			})
			.catch( err => {

			});
		}
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


	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Please wait...'
		});
		await this.loading.present();

		// const { role, data } = await this.loading.onDidDismiss();
		// this.locpop =0;
		// this.locClicked();
		// console.log('Loading dismissed!');
	}

	dismissLoading(){
		if(this.loading){
			this.loading.dismiss();
		}
	}

	ionViewWillLeave(){
		if(this.loading){
			this.loading.dismiss();
		}
	}

		// user_type = (user_type==2)?3:2

}
