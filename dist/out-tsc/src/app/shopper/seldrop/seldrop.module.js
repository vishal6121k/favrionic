import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { AgmCoreModule } from '@agm/core';
import { SeldropPageRoutingModule } from './seldrop-routing.module';
import { SeldropPage } from './seldrop.page';
let SeldropPageModule = /** @class */ (() => {
    let SeldropPageModule = class SeldropPageModule {
    };
    SeldropPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IconModule,
                AgmCoreModule.forRoot({
                    apiKey: "AIzaSyC7RAT2MhwmKUqs2kEWuQjmka65lv6dYxY" + '&libraries=visualization'
                }),
                SeldropPageRoutingModule
            ],
            declarations: [SeldropPage]
        })
    ], SeldropPageModule);
    return SeldropPageModule;
})();
export { SeldropPageModule };
//# sourceMappingURL=seldrop.module.js.map