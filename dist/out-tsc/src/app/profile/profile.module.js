import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../icon/icon.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { LoccartComponent } from '../shopper/loccart/loccart.component';
let ProfilePageModule = /** @class */ (() => {
    let ProfilePageModule = class ProfilePageModule {
    };
    ProfilePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IconModule,
                ProfilePageRoutingModule
            ],
            declarations: [ProfilePage, LoccartComponent]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
})();
export { ProfilePageModule };
//# sourceMappingURL=profile.module.js.map