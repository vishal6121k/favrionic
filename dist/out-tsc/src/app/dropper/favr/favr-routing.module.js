import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavrPage } from './favr.page';
const routes = [
    {
        path: '',
        component: FavrPage
    }
];
let FavrPageRoutingModule = /** @class */ (() => {
    let FavrPageRoutingModule = class FavrPageRoutingModule {
    };
    FavrPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
        })
    ], FavrPageRoutingModule);
    return FavrPageRoutingModule;
})();
export { FavrPageRoutingModule };
//# sourceMappingURL=favr-routing.module.js.map