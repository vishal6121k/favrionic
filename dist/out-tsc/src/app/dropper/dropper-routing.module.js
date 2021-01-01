import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropperPage } from './dropper.page';
const routes = [
    {
        path: '',
        component: DropperPage,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
            }
        ]
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'favr',
        loadChildren: () => import('./favr/favr.module').then(m => m.FavrPageModule)
    },
    {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'start/:id',
        loadChildren: () => import('./start/start.module').then(m => m.StartPageModule)
    },
    {
        path: 'track/:id',
        loadChildren: () => import('./track/track.module').then(m => m.TrackPageModule)
    }
];
let DropperPageRoutingModule = /** @class */ (() => {
    let DropperPageRoutingModule = class DropperPageRoutingModule {
    };
    DropperPageRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
        })
    ], DropperPageRoutingModule);
    return DropperPageRoutingModule;
})();
export { DropperPageRoutingModule };
//# sourceMappingURL=dropper-routing.module.js.map