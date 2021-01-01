import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { AgmCoreModule } from '@agm/core';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
let CartPageModule = /** @class */ (() => {
    let CartPageModule = class CartPageModule {
    };
    CartPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IconModule,
                AgmCoreModule.forRoot({
                    apiKey: "AIzaSyC7RAT2MhwmKUqs2kEWuQjmka65lv6dYxY" + '&libraries=visualization'
                }),
                CartPageRoutingModule
            ],
            declarations: [CartPage]
        })
    ], CartPageModule);
    return CartPageModule;
})();
export { CartPageModule };
//# sourceMappingURL=cart.module.js.map