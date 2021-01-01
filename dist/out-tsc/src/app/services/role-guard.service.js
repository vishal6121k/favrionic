import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let RoleGuardService = /** @class */ (() => {
    let RoleGuardService = class RoleGuardService {
        constructor(router) {
            this.router = router;
        }
        canActivate(route) {
            let authInfo = {
                authenticated: true
            };
            if ((window.localStorage.getItem('user_type'))) {
                if ((window.localStorage.getItem('user_type')) == '2') {
                    this.router.navigate(["/shopper"]);
                    return false;
                }
                if ((window.localStorage.getItem('user_type')) == '3') {
                    this.router.navigate(["/dropper"]);
                    return false;
                }
            }
            // if (!authInfo.authenticated) {
            // }
            console.log(route);
            return true;
        }
    };
    RoleGuardService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], RoleGuardService);
    return RoleGuardService;
})();
export { RoleGuardService };
//# sourceMappingURL=role-guard.service.js.map