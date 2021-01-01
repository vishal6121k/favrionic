import { __decorate } from "tslib";
import { Component } from '@angular/core';
let TrackPage = /** @class */ (() => {
    let TrackPage = class TrackPage {
        constructor(route, api, router) {
            this.route = route;
            this.api = api;
            this.router = router;
            this.cancPop = 0;
            this.cancRes = 0;
            this.chatOpen = 0;
            this.cancPopCont = 0;
            this.showPage = 0;
            this.ratePop = 0;
            this.ratingUser = 1;
            this.rateModel = {};
        }
        ngOnInit() {
            this.route.params.subscribe(params => {
                this.orderId = params['id'];
                console.log(this.orderId);
                this.getOrderDetails();
                this.ordInt = setInterval(() => {
                    this.getOrderDetails();
                }, 10000);
                // this.initialiseState(); // reset and set based on new parameter this time
            });
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
                this.lat = parseFloat(resp[0].dropper.current_loc[0].lat);
                this.lng = parseFloat(resp[0].dropper.current_loc[0].lon);
                this.delLat = parseFloat(resp[0].delivery_lat);
                this.delLng = parseFloat(resp[0].delivery_lon);
                this.origin = { lat: this.lat, lng: this.lng };
                this.destination = { lat: this.delLat, lng: this.delLng };
                if (this.orderDets.status == 6) {
                    this.ratePop = 1;
                    clearInterval(this.ordInt);
                }
                if (this.orderDets.status >= 6 && this.orderDets.shopper_rated == 1) {
                    this.router.navigate(['/dropper/home']);
                }
                // this.shopperReq = resp.shopperlist;
            })
                .catch(err => {
            });
        }
        mapReady() {
        }
        setOrderItemStatus(id) {
            var data = {
                order_detail_id: id
            };
            this.api.updateItemStatus(data)
                .then(resp => {
                console.log(resp);
            })
                .catch(err => {
            });
        }
        updateOrderStatus(status) {
            var data = {
                order_id: this.orderDets.id
            };
            this.api.updateOrderStatus(status, data)
                .then(resp => {
                console.log(resp);
            })
                .catch(err => {
            });
        }
        confirmDelivery() {
            var data = {
                order_id: this.orderDets.id
            };
            this.api.updateOrderStatus(6, data)
                .then(resp => {
                console.log(resp);
            })
                .catch(err => {
            });
        }
        saveRating() {
            var data = this.rateModel;
            data['order_id'] = this.orderId;
            console.log(data);
            this.api.saveShopperRating(data)
                .then(resp => {
                this.router.navigate(['/dropper/home']);
            })
                .catch(err => {
            });
        }
    };
    TrackPage = __decorate([
        Component({
            selector: 'app-track',
            templateUrl: './track.page.html',
            styleUrls: ['./track.page.scss'],
        })
    ], TrackPage);
    return TrackPage;
})();
export { TrackPage };
//# sourceMappingURL=track.page.js.map