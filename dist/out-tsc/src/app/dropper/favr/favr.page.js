import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FavrPage = /** @class */ (() => {
    let FavrPage = class FavrPage {
        constructor() {
            this.priceSlideOpts = {
                slidesPerView: 3,
                initialSlide: 0,
                speed: 400,
                freeMode: true
            };
            this.favrHistPop = 0;
        }
        ngOnInit() { }
    };
    FavrPage = __decorate([
        Component({
            selector: 'app-favr',
            templateUrl: './favr.page.html',
            styleUrls: ['./favr.page.scss'],
        })
    ], FavrPage);
    return FavrPage;
})();
export { FavrPage };
//# sourceMappingURL=favr.page.js.map