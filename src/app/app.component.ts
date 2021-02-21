import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { ApiService } from './services/api.service';
import { MiscService } from './services/misc.service';
import { NotifyService } from './services/notify.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { Router, ActivatedRoute, Event } from '@angular/router';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { NavigationStart, NavigationError, NavigationEnd } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	splashEnd:any = 0;
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private mobileAccessibility: MobileAccessibility,
		private api:ApiService,
		private misc:MiscService,
		private firebase:FirebaseX,
		private notify:NotifyService,
		private androidPermissions: AndroidPermissions,
		private backgroundMode: BackgroundMode,
		private router: Router
	) {
		this.splashEnd = 1;
	  	setTimeout(() => {
		  this.splashEnd = -1;
		}, 3000);

		this.platform.ready().then(() => {

			this.initializeApp();
			
			this.getConfig();
		});

		this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {

            }
        });
		this.statusBar.styleDefault();
		this.statusBar.backgroundColorByHexString('#FFF');
	}

	initializeApp() {
		this.misc.getAllPermissions();
		this.misc.enableBGMode();
		this.misc.setTextZoom();
		
			this.firebase.onMessageReceived()
			.subscribe(data => {
			  var messagebody = JSON.parse(data.message);
			  console.log(data.tap);
			  if(data.tap != undefined && !(window.location.pathname == '/'+messagebody.action_url)){
			      this.router.navigate(['/'+messagebody.action_url]);
			  }
			  else if(data.tap == undefined && !(window.location.pathname == '/'+messagebody.action_url)){
			    this.notify.notify(data);
			  }
			});
	}
	getConfig(){
		this.api.getAppConfig()
		.then(resp => {
			window.localStorage.setItem('config', JSON.stringify(resp));
		})
		.catch(err => {

		});
	}
	ionViewDidLoad(){
		console.log('view loaded');
	}
}
