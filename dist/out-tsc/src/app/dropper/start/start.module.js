import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StartPageRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';
let StartPageModule = /** @class */ (() => {
    let StartPageModule = class StartPageModule {
    };
    StartPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                StartPageRoutingModule
            ],
            declarations: [StartPage]
        })
    ], StartPageModule);
    return StartPageModule;
})();
export { StartPageModule };
//# sourceMappingURL=start.module.js.map