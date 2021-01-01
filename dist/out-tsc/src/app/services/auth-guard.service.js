import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let AuthGuardService = /** @class */ (() => {
    let AuthGuardService = class AuthGuardService {
        constructor(router) {
            this.router = router;
        }
        canActivate(route) {
            console.log(route);
            let authInfo = {
                authenticated: true
            };
            if ((window.localStorage.getItem('token'))) {
                this.router.navigate(["choose"]);
                return false;
            }
            return true;
        }
    };
    AuthGuardService = __decorate([
        Injectable({
            providedIn: "root"
        })
    ], AuthGuardService);
    return AuthGuardService;
})();
export { AuthGuardService };
//# sourceMappingURL=auth-guard.service.js.map