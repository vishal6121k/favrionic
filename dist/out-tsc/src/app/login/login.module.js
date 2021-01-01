import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../icon/icon.module';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
let LoginPageModule = /** @class */ (() => {
    let LoginPageModule = class LoginPageModule {
    };
    LoginPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IconModule,
                LoginPageRoutingModule
            ],
            declarations: [LoginPage]
        })
    ], LoginPageModule);
    return LoginPageModule;
})();
export { LoginPageModule };
//# sourceMappingURL=login.module.js.map