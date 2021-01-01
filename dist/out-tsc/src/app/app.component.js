import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = /** @class */ (() => {
    let AppComponent = class AppComponent {
        constructor(platform, splashScreen, statusBar, mobileAccessibility, api) {
            this.platform = platform;
            this.splashScreen = splashScreen;
            this.statusBar = statusBar;
            this.mobileAccessibility = mobileAccessibility;
            this.api = api;
            this.splashEnd = 0;
            this.initializeApp();
            this.getConfig();
        }
        initializeApp() {
            this.platform.ready().then(() => {
                // this.statusBar.styleDefault();
                this.statusBar.backgroundColorByHexString('#6D7278');
                if (this.mobileAccessibility) {
                    this.mobileAccessibility.usePreferredTextZoom(false);
                }
                setTimeout(() => {
                    this.splashEnd = 1;
                }, 6000);
                this.splashScreen.hide();
            });
        }
        getConfig() {
            this.api.getAppConfig()
                .then(resp => {
                window.localStorage.setItem('config', JSON.stringify(resp));
            })
                .catch(err => {
            });
        }
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
})();
export { AppComponent };
//# sourceMappingURL=app.component.js.map