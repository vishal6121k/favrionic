import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RatePage } from './rate.page';
const routes = [
    {
        path: '',
        component: RatePage
    }
];
let RatePageRoutingModule = /** @class */ (() => {
    let RatePageRoutingModule = class RatePageRoutingModule {
    };
    RatePageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
        })
    ], RatePageRoutingModule);
    return RatePageRoutingModule;
})();
export { RatePageRoutingModule };
//# sourceMappingURL=rate-routing.module.js.map