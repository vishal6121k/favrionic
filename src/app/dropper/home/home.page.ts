import { Component, OnInit, OnDestroy } from '@angular/core';
import { google } from '@google/maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	notePop:any = 0;
	dropPop:any = 0;
	defDist:any = 5;
  lat:any = 51.678418;
  lng:any = 7.809007;
  deflat:any = 51.678418;
  deflng:any = 7.809007;
  zoom = 12;
  radius:any;
  shopperReq:any = [];
  orderDets:any;
  subscription:any;
  options:any;
  saveLocation:any = true;
  showMap:any = 0;
  shopperAnimation:any;
  config: BackgroundGeolocationConfig = {
            desiredAccuracy: 10,
            stationaryRadius: 1,
            distanceFilter: 1,
            interval: 10000,
            stopOnStillActivity: false,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };
  constructor(private androidPermissions: AndroidPermissions, private geolocation: Geolocation, private locationAccuracy: LocationAccuracy, private api: ApiService, private router: Router, private backgroundGeolocation: BackgroundGeolocation) {
    
  }

  ngOnInit() {
    this.checkGPSPermission();
  }

  getShopperRequests(){
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

  mapReady(){
    this.radius = this.defDist * 1000;
  }
  viewOrderDetails(order_id){
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
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocation()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }
  getLocation(){
    console.log("getting location");
    this.options = {
        enableHighAccuracy : true
    };

    var lastUpdateTime, minFrequency = 10*1000;

    this.geolocation.getCurrentPosition(this.options).then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.deflat = resp.coords.latitude;
      this.deflng = resp.coords.longitude;
      this.shopperAnimation = "BOUNCE";
      this.showMap = 1;
      setTimeout(()=>{
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
        this.lat = data.coords.latitude
        this.lng = data.coords.longitude
        var apidata = {
          'lat': this.lat,
          'lon': this.lng
        };

        now = new Date();
        if(lastUpdateTime && now.getTime() - lastUpdateTime.getTime() < minFrequency){
          console.log("Ignoring position update");
          return;
        }
        lastUpdateTime = now;
        this.api.addUserPolling(apidata)
        .then(resp => {
          // console.log('abc');
          this.saveLocation = false;
          this.getShopperRequests();
          setInterval(()=>{
            this.getShopperRequests();
          }, 60000);
        })
        .catch(err => {

        });

      } else {
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

  acceptShopperOffer(order_id){
    var data = {
      order_id: order_id
    };

    this.api.acceptShopperOffer(data)
    .then(resp => {
      console.log(resp);
      this.router.navigate(['/dropper/start/'+resp.order_id]);
      // routerLink="/dropper/start"
    })
    .catch(err => {

    });
  }

  ngOnDestroy(){
    alert('unsub');
    this.subscription.unsubscribe();
  }

  changeDist(event){
  	this.defDist = event.detail.value;
    this.radius = this.defDist * 1000;
  }

}