import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { ApiService } from './services/api.service';

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
    private api:ApiService
  ) {
    this.initializeApp();
    this.getConfig();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#6D7278');
      if(this.mobileAccessibility){
          this.mobileAccessibility.usePreferredTextZoom(false);
      }
      setTimeout(() => {
        this.splashEnd = 1;
      }, 6000);
      this.splashScreen.hide();
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
