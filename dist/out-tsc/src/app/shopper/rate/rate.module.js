import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RatePageRoutingModule } from './rate-routing.module';
import { RatePage } from './rate.page';
let RatePageModule = /** @class */ (() => {
    let RatePageModule = class RatePageModule {
    };
    RatePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RatePageRoutingModule
            ],
            declarations: [RatePage]
        })
    ], RatePageModule);
    return RatePageModule;
})();
export { RatePageModule };
//# sourceMappingURL=rate.module.js.map