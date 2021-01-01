import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersPage } from './orders.page';
const routes = [
    {
        path: '',
        component: OrdersPage
    }
];
let OrdersPageRoutingModule = /** @class */ (() => {
    let OrdersPageRoutingModule = class OrdersPageRoutingModule {
    };
    OrdersPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
        })
    ], OrdersPageRoutingModule);
    return OrdersPageRoutingModule;
})();
export { OrdersPageRoutingModule };
//# sourceMappingURL=orders-routing.module.js.map