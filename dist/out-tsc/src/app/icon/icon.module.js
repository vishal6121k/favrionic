import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgComponent } from './svg/svg.component';
let IconModule = /** @class */ (() => {
    let IconModule = class IconModule {
    };
    IconModule = __decorate([
        NgModule({
            declarations: [SvgComponent],
            imports: [
                CommonModule
            ],
            exports: [SvgComponent]
        })
    ], IconModule);
    return IconModule;
})();
export { IconModule };
//# sourceMappingURL=icon.module.js.map