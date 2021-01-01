import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomePage = /** @class */ (() => {
    let HomePage = class HomePage {
        constructor(androidPermissions, geolocation, locationAccuracy, api, router, backgroundGeolocation) {
            this.androidPermissions = androidPermissions;
            this.geolocation = geolocation;
            this.locationAccuracy = locationAccuracy;
            this.api = api;
            this.router = router;
            this.backgroundGeolocation = backgroundGeolocation;
            this.notePop = 0;
            this.dropPop = 0;
            this.defDist = 5;
            this.lat = 51.678418;
            this.lng = 7.809007;
            this.deflat = 51.678418;
            this.deflng = 7.809007;
            this.zoom = 12;
            this.shopperReq = [];
            this.saveLocation = true;
            this.showMap = 0;
            this.config = {
                desiredAccuracy: 10,
                stationaryRadius: 1,
                distanceFilter: 1,
                interval: 10000,
                stopOnStillActivity: false,
                debug: true,
                stopOnTerminate: false,
            };
        }
        ngOnInit() {
            this.checkGPSPermission();
        }
        getShopperRequests() {
            var data = {
                'radius': this.defDist
            };
            this.api.getShopperRequests(data)
                .then(resp => {
                console.log(resp);
                this.shopperReq = resp.shopperlist;
            })
                .catch(err => {
            });
        }
        mapReady() {
            this.radius = this.defDist * 1000;
        }
        viewOrderDetails(order_id) {
            var data = {
                order_id: order_id
            };
            this.api.getOrderById(data)
                .then(resp => {
                console.log(resp);
                this.orderDets = resp[0];
                this.dropPop = 1;
                // this.shopperReq = resp.shopperlist;
            })
                .catch(err => {
            });
        }
        checkGPSPermission() {
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(result => {
                if (result.hasPermission) {
                    //If having permission show 'Turn On GPS' dialogue
                    this.askToTurnOnGPS();
                }
                else {
                    //If not having permission ask for permission
                    this.requestGPSPermission();
                }
            }, err => {
                alert(err);
            });
        }
        requestGPSPermission() {
            this.locationAccuracy.canRequest().then((canRequest) => {
                if (canRequest) {
                    console.log("4");
                }
                else {
                    //Show 'GPS Permission Request' dialogue
                    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
                        .then(() => {
                        // call method to turn on GPS
                        this.askToTurnOnGPS();
                    }, error => {
                        //Show alert if user click on 'No Thanks'
                        alert('requestPermission Error requesting location permissions ' + error);
                    });
                }
            });
        }
        askToTurnOnGPS() {
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
                // When GPS Turned ON call method to get Accurate location coordinates
                this.getLocation();
            }, error => alert('Error requesting location permissions ' + JSON.stringify(error)));
        }
        getLocation() {
            console.log("getting location");
            this.options = {
                enableHighAccuracy: true
            };
            var lastUpdateTime, minFrequency = 10 * 1000;
            this.geolocation.getCurrentPosition(this.options).then((resp) => {
                this.lat = resp.coords.latitude;
                this.lng = resp.coords.longitude;
                this.deflat = resp.coords.latitude;
                this.deflng = resp.coords.longitude;
                this.shopperAnimation = "BOUNCE";
                this.showMap = 1;
                setTimeout(() => {
                    this.shopperAnimation = null;
                }, 2000);
                // console.log(resp.coords.latitude);
            }).catch((error) => {
                console.log('Error getting location', error);
            });
            var now;
            let watch = this.geolocation.watchPosition(this.options);
            this.subscription = watch.subscribe((data) => {
                console.log('getting location');
                if ("coords" in data) {
                    // console.log(data.coords);
                    this.lat = data.coords.latitude;
                    this.lng = data.coords.longitude;
                    var apidata = {
                        'lat': this.lat,
                        'lon': this.lng
                    };
                    now = new Date();
                    if (lastUpdateTime && now.getTime() - lastUpdateTime.getTime() < minFrequency) {
                        console.log("Ignoring position update");
                        return;
                    }
                    lastUpdateTime = now;
                    this.api.addUserPolling(apidata)
                        .then(resp => {
                        // console.log('abc');
                        this.saveLocation = false;
                        this.getShopperRequests();
                        setInterval(() => {
                            this.getShopperRequests();
                        }, 60000);
                    })
                        .catch(err => {
                    });
                }
                else {
                    // ruh roh we have a PositionError
                    console.log('error');
                }
                //   this.backgroundGeolocation.configure(this.config)
                // .then(() => {
                //   this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
                //     console.log(location);
                //     // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
                //     // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
                //     // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
                //     // this.backgroundGeolocation.finish(); // FOR IOS ONLY
                //   });
                // });
                // start recording location
                // this.backgroundGeolocation.start();
                // If you wish to turn OFF background-tracking, call the #stop method.
                // this.backgroundGeolocation.stop();
                // data can be a set of coordinates, or an error (if an error occurred).
                // data.coords.latitude
                // data.coords.longitude
            });
        }
        acceptShopperOffer(order_id) {
            var data = {
                order_id: order_id
            };
            this.api.acceptShopperOffer(data)
                .then(resp => {
                console.log(resp);
                this.router.navigate(['/dropper/start/' + resp.order_id]);
                // routerLink="/dropper/start"
            })
                .catch(err => {
            });
        }
        ngOnDestroy() {
            alert('unsub');
            this.subscription.unsubscribe();
        }
        changeDist(event) {
            this.defDist = event.detail.value;
            this.radius = this.defDist * 1000;
        }
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        })
    ], HomePage);
    return HomePage;
})();
export { HomePage };
//# sourceMappingURL=home.page.js.map