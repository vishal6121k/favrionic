import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../icon/icon.module';
import { ShopperPageRoutingModule } from './shopper-routing.module';
import { ShopperPage } from './shopper.page';
let ShopperPageModule = /** @class */ (() => {
    let ShopperPageModule = class ShopperPageModule {
    };
    ShopperPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IconModule,
                ShopperPageRoutingModule
            ],
            declarations: [ShopperPage]
        })
    ], ShopperPageModule);
    return ShopperPageModule;
})();
export { ShopperPageModule };
//# sourceMappingURL=shopper.module.js.map