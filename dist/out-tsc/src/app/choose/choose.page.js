import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ChoosePage = /** @class */ (() => {
    let ChoosePage = class ChoosePage {
        constructor(router, api) {
            this.router = router;
            this.api = api;
            this.choose = 0;
        }
        ngOnInit() {
        }
        chooseRole() {
            window.localStorage.setItem('user_type', this.choose);
            // switchRole: any;
            this.api.switchRole()
                .then(resp => {
                if (this.choose == 2) {
                    this.router.navigate(['/shopper']);
                }
                else if (this.choose == 3) {
                    this.router.navigate(['/dropper']);
                }
            })
                .catch(err => {
            });
        }
    };
    ChoosePage = __decorate([
        Component({
            selector: 'app-choose',
            templateUrl: './choose.page.html',
            styleUrls: ['./choose.page.scss'],
        })
    ], ChoosePage);
    return ChoosePage;
})();
export { ChoosePage };
//# sourceMappingURL=choose.page.js.map