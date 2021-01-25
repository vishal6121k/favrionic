import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';

import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { IonicGestureConfig } from '../utils/IonicGestureConfig'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any> {
      // I will only use the swap gesture so 
      // I will deactivate the others to avoid overlaps
      'pinch': { enable: false },
      'rotate': { enable: false }
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MobileAccessibility,
    DatePicker,
    Geolocation,
    Stripe,
    AndroidPermissions,
    LocationAccuracy,
    Diagnostic,
    FirebaseX,
    StreamingMedia,
    BackgroundGeolocation,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy
    },
    {provide: HAMMER_GESTURE_CONFIG, useClass: IonicGestureConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
