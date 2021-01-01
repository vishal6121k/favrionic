import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartPage } from './cart.page';
const routes = [
    {
        path: '',
        component: CartPage
    }
];
let CartPageRoutingModule = /** @class */ (() => {
    let CartPageRoutingModule = class CartPageRoutingModule {
    };
    CartPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
        })
    ], CartPageRoutingModule);
    return CartPageRoutingModule;
})();
export { CartPageRoutingModule };
//# sourceMappingURL=cart-routing.module.js.map