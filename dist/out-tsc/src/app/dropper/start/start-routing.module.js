import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StartPage } from './start.page';
const routes = [
    {
        path: '',
        component: StartPage
    }
];
let StartPageRoutingModule = /** @class */ (() => {
    let StartPageRoutingModule = class StartPageRoutingModule {
    };
    StartPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
        })
    ], StartPageRoutingModule);
    return StartPageRoutingModule;
})();
export { StartPageRoutingModule };
//# sourceMappingURL=start-routing.module.js.map