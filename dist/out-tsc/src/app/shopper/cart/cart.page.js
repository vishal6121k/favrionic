import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CartPage = /** @class */ (() => {
    let CartPage = class CartPage {
        constructor(datePicker, geolocation, api, router) {
            this.datePicker = datePicker;
            this.geolocation = geolocation;
            this.api = api;
            this.router = router;
            this.selectedLoc = 0;
            this.locPop = 0;
            this.infoPop = 0;
            this.cartLength = 0;
            this.cartTotalAmount = 0;
            this.delAmnt = 0;
            this.payType = 0;
            this.payDrop = 0;
            this.showTime = "Today";
            this.showDate = "Select delivery slot";
            this.zoom = 18;
            this.address = "";
            this.location = "";
            this.landmark = "";
            this.loc_type = 3;
            this.formData = "";
            this.shopper_name = "";
            if (this.router.getCurrentNavigation().extras.state) {
                if (this.router.getCurrentNavigation().extras.state.formVal != undefined) {
                    this.formData = this.router.getCurrentNavigation().extras.state.formVal;
                    this.placeOrder();
                }
            }
        }
        ngOnInit() {
            this.cartProd = JSON.parse(window.localStorage.getItem('cart'));
            this.cartTotal();
        }
        addProd(id, price, name) {
            if (this.cartProd[id]) {
                this.cartProd[id]['quantity'] = this.cartProd[id]['quantity'] + 1;
                this.cartProd[id]['unit_amount'] = price;
                this.cartProd[id]['total_amount'] = price * this.cartProd[id]['quantity'];
                this.cartProd[id]['name'] = name;
                this.cartProd[id]['product_id'] = id;
            }
            else {
                this.cartProd[id] = {};
                this.cartProd[id]['quantity'] = 1;
                this.cartProd[id]['unit_amount'] = price;
                this.cartProd[id]['total_amount'] = price * this.cartProd[id]['quantity'];
                this.cartProd[id]['name'] = name;
                this.cartProd[id]['product_id'] = id;
            }
            console.log(this.cartProd);
            this.cartTotal();
        }
        subProd(id) {
            if (this.cartProd[id]['quantity'] > 1) {
                this.cartProd[id]['quantity'] = this.cartProd[id]['quantity'] - 1;
            }
            else {
                delete this.cartProd[id];
            }
            console.log(this.cartProd);
            this.cartTotal();
        }
        cartTotal() {
            window.localStorage.setItem('cart', JSON.stringify(this.cartProd));
            this.cartLength = 0;
            this.cartTotalAmount = 0;
            for (var el in this.cartProd) {
                if (this.cartProd.hasOwnProperty(el)) {
                    this.cartLength += parseFloat(this.cartProd[el]['quantity']);
                    this.cartTotalAmount += parseFloat(this.cartProd[el]['total_amount']);
                }
            }
        }
        showDatePicker() {
            this.datePicker.show({
                date: new Date(),
                mode: 'datetime',
                minDate: new Date(),
                androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
            }).then(date => {
                // console.log(date);
                var d = new Date(date);
                var finalDate = d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
                this.order_date = finalDate;
                this.showDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                this.showTime = d.getHours() + ":" + d.getMinutes();
                console.log('Got date: ', finalDate);
            })
                .catch(err => {
                console.log('Error occurred while getting date: ', err);
            });
        }
        getUserPosition() {
            this.locPop = 1;
            this.options = {
                enableHighAccuracy: true
            };
            this.geolocation.getCurrentPosition(this.options).then((pos) => {
                this.currentPos = pos;
                console.log(pos);
                this.lat = pos.coords.latitude;
                this.markLat = pos.coords.latitude;
                this.markLng = pos.coords.longitude;
                this.lng = pos.coords.longitude;
            }, (err) => {
                console.log("error : " + err.message);
            });
        }
        mapReady() {
            this.getAddress(this.markLat, this.markLng);
        }
        getAddress(lat, lng) {
            console.log('Finding Address');
            if (navigator.geolocation) {
                let geocoder = new google.maps.Geocoder();
                let latlng = new google.maps.LatLng(lat, lng);
                let request = { 'location': latlng };
                geocoder.geocode(request, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        let result = results[0];
                        let rsltAdrComponent = result.address_components;
                        let resultLength = rsltAdrComponent.length;
                        if (result != null) {
                            this.address = rsltAdrComponent[2].long_name + "," + rsltAdrComponent[1].long_name + "," + rsltAdrComponent[0].long_name;
                            this.landmark = rsltAdrComponent[0].long_name;
                            // this.address = rsltAdrComponent[resultLength - 8].short_name;
                            // this.address = rsltAdrComponent[resultLength - 8].short_name;
                            console.log(this.address);
                        }
                        else {
                            alert('No address available!');
                        }
                    }
                });
            }
        }
        centerChange(event) {
            console.log(event);
            this.markLat = event.lat;
            this.markLng = event.lng;
            this.getAddress(this.markLat, this.markLng);
        }
        placeOrder() {
            var data;
            if (this.formData != "") {
                data = JSON.parse(this.formData);
            }
            else {
                data = {
                    'delivery_lat': this.markLat,
                    'delivery_lon': this.markLng,
                    'delivery_address': this.location,
                    'delivery_pin': 123,
                    'delivery_charge': this.delAmnt,
                    'delivery_landmark': this.landmark,
                    'shipment_timeslot': this.order_date,
                    'total_amount': this.cartTotalAmount,
                    'payment_type': this.payType,
                    'caller_name': this.shopper_name,
                    'caller_mobileno': 1234,
                    'order_details': this.cartProd
                };
            }
            var token = window.localStorage.getItem('token');
            if (!(window.localStorage.getItem('token'))) {
                this.router.navigate(['/login'], { state: { redirectAfterLogin: '/shopper/cart', formVal: JSON.stringify(data) } });
                return false;
            }
            this.api.placeOrder(data)
                .then(resp => {
                // this.popProds = resp;
                // this.getReccProds();
                console.log(resp);
                this.router.navigate(['/shopper/seldrop/' + resp.orderId]);
            })
                .catch(err => {
            });
            // console.log(data);
        }
    };
    CartPage = __decorate([
        Component({
            selector: 'app-cart',
            templateUrl: './cart.page.html',
            styleUrls: ['./cart.page.scss'],
        })
    ], CartPage);
    return CartPage;
})();
export { CartPage };
//# sourceMappingURL=cart.page.js.map