import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { WebrtcService } from '../../providers/webrtc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit {
	cancPop:any = 0;
	cancRes:any = 0;
	itemPur:any;
	chatOpen:any = 0;
  orderId:any;
  cancPopCont:any = 0;
  orderDets:any;
  showPage:any = 0;
  lat:any;
  lng:any;
  delLat:any;
  delLng:any;
  zoom:any = 16;
  origin:any;
  ordInt:any;
  public renderOptions = {
      suppressMarkers: true,
  }
  public markerOptions = {
      origin: {
          icon: 'assets/icon/rec1.png',
          // draggable: true,
      },
      destination: {
          icon: 'assets/icon/pin.png',
          // label: 'MARKER LABEL',
          // opacity: 0.8,
      },
  };
  destination:any;
  ratePop:any = 0;
  purchasedPopup:any = 0;
  rateModel:any = {};
  cancModel:any = {};
  blockModel:any = {};
  userId: any;
  partnerId: any;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;
  webrtc_enb:any = 0;
  chatModel:any = {};
  messages:any = [];
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, public webRTC: WebrtcService,
    public elRef: ElementRef, private androidPermissions: AndroidPermissions, private firebase: FirebaseX, private _ngZone: NgZone) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
        this.orderId = params['id'];
        console.log(this.orderId);
        this.getOrderDetails();
        this.getMessages();
        // this.ordInt = setInterval(() => {
        //   this.getOrderDetails();
        // }, 20000);
        this.firebase.onMessageReceived()
        .subscribe(data => {
            var messagebody = JSON.parse(data.message);
            console.log(messagebody);
            if(messagebody.type == 'order_update'){
              this._ngZone.run(() => {
                this.getOrderDetails();
              });
            }
            if(messagebody.type == 'received_message'){
              this._ngZone.run(() => {
                this.getMessages();
              });
            }
        });
        // this.initialiseState(); // reset and set based on new parameter this time
    });
  }


  getOrderDetails(){
      var data = {
        order_id: this.orderId
      };
      this.api.getOrderById(data)
      .then(resp => {
        console.log(resp);
        this.orderDets = resp[0];
        this.lat = parseFloat(resp[0].dropper.current_loc[0].lat);
        this.lng = parseFloat(resp[0].dropper.current_loc[0].lon);
        this.delLat = parseFloat(resp[0].delivery_lat);
        this.delLng = parseFloat(resp[0].delivery_lon);
        this.origin = { lat: this.lat, lng: this.lng };
        this.destination = { lat: this.delLat, lng: this.delLng };
        if(this.webrtc_enb == 0){
          this.userId = resp[0].user_id;
          this.partnerId = resp[0].dropper_id;
          // this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
          // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          //   result => console.log('Has permission?',result.hasPermission),
          //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
          // );
          // this.webRTC.init(this.userId, this.myEl, this.partnerEl);
          this.webrtc_enb = 1;
        }
        this.showPage = 1;
        if(this.orderDets.status == 6){
          this.ratePop = 1;
          // clearInterval(this.ordInt);
        }
        if((this.orderDets.status >= 6 && this.orderDets.dropper_rated == 1) || (this.orderDets.status == 7)) {
          clearInterval(this.ordInt);
          this.router.navigate(['/shopper/home']);
        }
        // this.shopperReq = resp.shopperlist;
      })
      .catch(err => {

      });
  }

  mapReady(){

  }

  cancelOrder(rel=1){
    var data = this.cancModel;
    data['order_id'] = this.orderId;
    console.log(data);
    this.api.cancelOrder(data)
    .then(resp => {
      if(rel == 1)
        this.router.navigate(['/shopper/home']);
    })
    .catch(err => {

    });
  }

  blockUser(){
    this.cancModel = {
      cancel_type: 4,
      cancel_reason: "Blocked by User"
    };

    this.cancelOrder(0);

    var data = {
      reported_user_id: this.orderDets.dropper.id,
      reason: this.blockModel.reason
    };

    this.api.blockUser(data)
    .then(resp => {
      this.router.navigate(['/shopper/home']);
    })
    .catch(err => {

    });
  }

  saveRating(){
    var data = this.rateModel;
    data['order_id'] = this.orderId;
    console.log(data);
    this.api.saveDropperRating(data)
    .then(resp => {
      this.router.navigate(['/shopper/home']);
    })
    .catch(err => {

    });
  }


  init() {
    this.myEl = this.elRef.nativeElement.querySelector('#my-video');
    this.partnerEl = this.elRef.nativeElement.querySelector('#partner-video');

    // this.webRTC.init(this.userId, this.myEl, this.partnerEl);
  }

  call() {
    this.webRTC.call(this.partnerId);
    console.log('callTo'+this.partnerId);
    // this.swapVideo('my-video');
  }

  sendMessage(){
    var data = this.chatModel;
    data['to'] = 'dropper';
    data['order_id'] = this.orderId;
    this.api.sendMessage(data)
    .then(resp =>{
      this.getMessages();
    })
    .catch(err => {

    });
  }

  getMessages(){
    var data = {};
    data['order_id'] = this.orderId;
    this.api.getMessages(data)
    .then(resp =>{
      this.messages = resp.messages;
    })
    .catch(err => {

    });
  }

}
