import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DropperPageRoutingModule } from './dropper-routing.module';
import { DropperPage } from './dropper.page';
let DropperPageModule = /** @class */ (() => {
    let DropperPageModule = class DropperPageModule {
    };
    DropperPageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                DropperPageRoutingModule
            ],
            declarations: [DropperPage]
        })
    ], DropperPageModule);
    return DropperPageModule;
})();
export { DropperPageModule };
//# sourceMappingURL=dropper.module.js.map