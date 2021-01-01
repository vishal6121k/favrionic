import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { FavrPageRoutingModule } from './favr-routing.module';
import { LoccartComponent } from '../loccart/loccart.component';
import { FavrPage } from './favr.page';
let FavrPageModule = /** @class */ (() => {
    let FavrPageModule = class FavrPageModule {
    };
    FavrPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IconModule,
                FavrPageRoutingModule
            ],
            declarations: [FavrPage, LoccartComponent]
        })
    ], FavrPageModule);
    return FavrPageModule;
})();
export { FavrPageModule };
//# sourceMappingURL=favr.module.js.map