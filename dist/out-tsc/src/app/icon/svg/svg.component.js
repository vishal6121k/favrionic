import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let SvgComponent = /** @class */ (() => {
    let SvgComponent = class SvgComponent {
        constructor() { }
        ngOnInit() { }
    };
    __decorate([
        Input()
    ], SvgComponent.prototype, "name", void 0);
    SvgComponent = __decorate([
        Component({
            selector: 'app-svg',
            templateUrl: './svg.component.html',
            styleUrls: ['./svg.component.scss'],
        })
    ], SvgComponent);
    return SvgComponent;
})();
export { SvgComponent };
//# sourceMappingURL=svg.component.js.map