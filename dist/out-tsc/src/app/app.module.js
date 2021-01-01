import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
let HammerConfig = /** @class */ (() => {
    let HammerConfig = class HammerConfig extends HammerGestureConfig {
        constructor() {
            super(...arguments);
            this.overrides = {
                // I will only use the swap gesture so 
                // I will deactivate the others to avoid overlaps
                'pinch': { enable: false },
                'rotate': { enable: false }
            };
        }
    };
    HammerConfig = __decorate([
        Injectable()
    ], HammerConfig);
    return HammerConfig;
})();
export { HammerConfig };
let AppModule = /** @class */ (() => {
    let AppModule = class AppModule {
    };
    AppModule = __decorate([
        NgModule({
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
                BackgroundGeolocation,
                // { 
                //   provide: RouteReuseStrategy, 
                //   useClass: IonicRouteStrategy
                // },
                {
                    provide: HAMMER_GESTURE_CONFIG,
                    useClass: HammerConfig
                }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
})();
export { AppModule };
//# sourceMappingURL=app.module.js.map