import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
	reqPop:any = 0;
	orderId:any;
	orderDets:any;
	showPage:any = 0;
	ordDetsInt:any;
  ProdImgUrl:any = "http://favr.coderpanda.tk/uploads/";
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private firebase: FirebaseX) { }
  ngOnInit() {
  	this.route.params.subscribe(params => {
        this.orderId = params['id'];
        console.log(this.orderId);
        this.getOrderDetails();
        // this.initialiseState(); // reset and set based on new parameter this time
    });
  }

  addDels(c1,c2){
    return parseFloat(c1) + parseFloat(c2);
  }


  getOrderDetails(){
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
  	waitForAccept(){
  		this.reqPop = 1;

      this.firebase.onMessageReceived()
      .subscribe(data => {
          var messagebody = JSON.parse(data.message);
          console.log(messagebody);
          if(messagebody.type == 'order_update'){
            this.getOrderDetails();
          }
          // if(messagebody.type == )
          // this.getShopperRequests();
      });
  		this.ordDetsInt = setInterval(()=>{
  			if(this.orderDets.dropper_id != null){
  				clearInterval(this.ordDetsInt);
	  			if(this.orderDets.dropper_me == 1){
	  				// alert('Me Dropper');
	  				this.router.navigate(['/dropper/track/'+this.orderDets.id]);
	  			}
	  			else{
	  				alert('Order assigned to Other Dropper');
	  			}
  			}
          	// this.getOrderDetails();
        }, 2000);
  	}

}
