import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TrackPage } from './track.page';
const routes = [
    {
        path: '',
        component: TrackPage
    }
];
let TrackPageRoutingModule = /** @class */ (() => {
    let TrackPageRoutingModule = class TrackPageRoutingModule {
    };
    TrackPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
        })
    ], TrackPageRoutingModule);
    return TrackPageRoutingModule;
})();
export { TrackPageRoutingModule };
//# sourceMappingURL=track-routing.module.js.map