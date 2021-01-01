import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { LoccartComponent } from '../loccart/loccart.component';
let HomePageModule = /** @class */ (() => {
    let HomePageModule = class HomePageModule {
    };
    HomePageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                IconModule,
                HomePageRoutingModule
            ],
            declarations: [HomePage, LoccartComponent]
        })
    ], HomePageModule);
    return HomePageModule;
})();
export { HomePageModule };
//# sourceMappingURL=home.module.js.map