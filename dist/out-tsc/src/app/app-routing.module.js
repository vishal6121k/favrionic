import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { AuthGuardService } from "./services/auth-guard.service";
import { RoleGuardService } from "./services/role-guard.service";
const routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
        canActivate: [AuthGuardService]
    },
    {
        path: 'choose',
        loadChildren: () => import('./choose/choose.module').then(m => m.ChoosePageModule),
        canActivate: [RoleGuardService]
    },
    {
        path: 'shopper',
        loadChildren: () => import('./shopper/shopper.module').then(m => m.ShopperPageModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
    },
    {
        path: 'dropper',
        loadChildren: () => import('./dropper/dropper.module').then(m => m.DropperPageModule)
    },
];
let AppRoutingModule = /** @class */ (() => {
    let AppRoutingModule = class AppRoutingModule {
    };
    AppRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
})();
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map