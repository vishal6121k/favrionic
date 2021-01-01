import { __decorate } from "tslib";
import { Component } from '@angular/core';
let OrdersPage = /** @class */ (() => {
    let OrdersPage = class OrdersPage {
        constructor(api) {
            this.api = api;
        }
        ngOnInit() {
            this.getAllOrder();
        }
        getAllOrder() {
            // getFavrTransacList
            var data = {
                offset: 0,
                limit: 1000
            };
            this.api.getAllOrder(data)
                .then(resp => {
                this.orders = resp;
                console.log(resp);
            })
                .catch(err => {
                console.log(err);
            });
        }
    };
    OrdersPage = __decorate([
        Component({
            selector: 'app-orders',
            templateUrl: './orders.page.html',
            styleUrls: ['./orders.page.scss'],
        })
    ], OrdersPage);
    return OrdersPage;
})();
export { OrdersPage };
//# sourceMappingURL=orders.page.js.map