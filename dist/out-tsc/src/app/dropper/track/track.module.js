import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { TrackPageRoutingModule } from './track-routing.module';
import { TrackPage } from './track.page';
let TrackPageModule = /** @class */ (() => {
    let TrackPageModule = class TrackPageModule {
    };
    TrackPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IconModule,
                AgmCoreModule.forRoot({
                    apiKey: "AIzaSyC7RAT2MhwmKUqs2kEWuQjmka65lv6dYxY" + '&libraries=visualization'
                }),
                AgmDirectionModule,
                TrackPageRoutingModule
            ],
            declarations: [TrackPage]
        })
    ], TrackPageModule);
    return TrackPageModule;
})();
export { TrackPageModule };
//# sourceMappingURL=track.module.js.map