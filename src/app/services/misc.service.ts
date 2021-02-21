import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { ApiService } from './api.service';
import { NotifyService } from './notify.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
@Injectable({
  	providedIn: 'root'
})
export class MiscService {

	userDets:any;
  	constructor(
    	private platform: Platform,
    	private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private mobileAccessibility: MobileAccessibility,
		private api:ApiService,
		// private misc:MiscService,
		private notify:NotifyService,
		// private firebase: FirebaseX,
		private androidPermissions: AndroidPermissions,
		private backgroundMode: BackgroundMode,
		private router: Router
  	) {

  	}

  	getUserDets(){
		this.userDets = window.localStorage.getItem('user');
		return JSON.parse(this.userDets);
	}

	setUserDets(userDets){
		this.userDets = window.localStorage.setItem('user', userDets);
		// return JSON.parse(userDets);
	}



  	setTextZoom(){
  		if(this.mobileAccessibility){
          	this.mobileAccessibility.usePreferredTextZoom(false);
          	this.mobileAccessibility.setTextZoom(100);
      	}
  	}

  	getAllPermissions(){
  		this.platform.ready().then(() => {
	      	if (this.platform.is('cordova')) {
	          	this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.RECORD_AUDIO]);
	      
	          	this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
	              	result => console.log('Has permission?', result.hasPermission),
	              	err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
	          	);

	          	this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
	              	result => console.log('Has permission?', result.hasPermission),
	              	err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
	          	);

	          	this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS).then(
	              	result => console.log('Has permission?', result.hasPermission),
	              	err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS)
	          	);
	      	}
  		});
	}

	enableBGMode(){
		this.backgroundMode.setDefaults({ silent: true })
		this.backgroundMode.enable();
		this.backgroundMode.setEnabled(true);
	}

}
