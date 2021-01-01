import { __decorate } from "tslib";
import { Component } from '@angular/core';
let StartPage = /** @class */ (() => {
    let StartPage = class StartPage {
        constructor(route, api, router) {
            this.route = route;
            this.api = api;
            this.router = router;
            this.reqPop = 0;
            this.showPage = 0;
        }
        ngOnInit() {
            this.route.params.subscribe(params => {
                this.orderId = params['id'];
                console.log(this.orderId);
                this.getOrderDetails();
                // this.initialiseState(); // reset and set based on new parameter this time
            });
        }
        addDels(c1, c2) {
            return parseFloat(c1) + parseFloat(c2);
        }
        getOrderDetails() {
            var data = {
                order_id: this.orderId
            };
            this.api.getOrderById(data)
                .then(resp => {
                console.log(resp);
                this.orderDets = resp[0];
                this.showPage = 1;
                // this.shopperReq = resp.shopperlist;
            })
                .catch(err => {
            });
        }
        waitForAccept() {
            this.reqPop = 1;
            this.ordDetsInt = setInterval(() => {
                if (this.orderDets.dropper_id != null) {
                    clearInterval(this.ordDetsInt);
                    if (this.orderDets.dropper_me == 1) {
                        // alert('Me Dropper');
                        this.router.navigate(['/dropper/track/' + this.orderDets.id]);
                    }
                    else {
                        alert('Order assigned to Other Dropper');
                    }
                }
                this.getOrderDetails();
            }, 10000);
        }
    };
    StartPage = __decorate([
        Component({
            selector: 'app-start',
            templateUrl: './start.page.html',
            styleUrls: ['./start.page.scss'],
        })
    ], StartPage);
    return StartPage;
})();
export { StartPage };
//# sourceMappingURL=start.page.js.map