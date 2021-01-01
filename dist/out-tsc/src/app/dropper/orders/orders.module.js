import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { OrdersPageRoutingModule } from './orders-routing.module';
import { OrdersPage } from './orders.page';
import { LoccartComponent } from '../loccart/loccart.component';
let OrdersPageModule = /** @class */ (() => {
    let OrdersPageModule = class OrdersPageModule {
    };
    OrdersPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IconModule,
                OrdersPageRoutingModule
            ],
            declarations: [OrdersPage, LoccartComponent]
        })
    ], OrdersPageModule);
    return OrdersPageModule;
})();
export { OrdersPageModule };
//# sourceMappingURL=orders.module.js.map