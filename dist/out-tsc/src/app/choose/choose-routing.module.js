import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChoosePage } from './choose.page';
const routes = [
    {
        path: '',
        component: ChoosePage
    }
];
let ChoosePageRoutingModule = /** @class */ (() => {
    let ChoosePageRoutingModule = class ChoosePageRoutingModule {
    };
    ChoosePageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
        })
    ], ChoosePageRoutingModule);
    return ChoosePageRoutingModule;
})();
export { ChoosePageRoutingModule };
//# sourceMappingURL=choose-routing.module.js.map