import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { ApiService } from './services/api.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";

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
    private firebase: FirebaseX,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
    this.getConfig();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      //   result => console.log('Has permission?', result.hasPermission),
      //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      // );
      this.statusBar.backgroundColorByHexString('#6D7278');
      if(this.mobileAccessibility){
          this.mobileAccessibility.usePreferredTextZoom(false);
      }
      setTimeout(() => {
        this.splashEnd = 1;
      }, 6000);
      this.splashScreen.hide();
      // this.firebase.onMessageReceived()
      // .subscribe(data => console.log(data) );

      // var getUserMedia = navigator.mediaDevices.getUserMedia;
      // console.log(getUserMedia);
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
}
