import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeldropPage } from './seldrop.page';
const routes = [
    {
        path: '',
        component: SeldropPage
    }
];
let SeldropPageRoutingModule = /** @class */ (() => {
    let SeldropPageRoutingModule = class SeldropPageRoutingModule {
    };
    SeldropPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
        })
    ], SeldropPageRoutingModule);
    return SeldropPageRoutingModule;
})();
export { SeldropPageRoutingModule };
//# sourceMappingURL=seldrop-routing.module.js.map