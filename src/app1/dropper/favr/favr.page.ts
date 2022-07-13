import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-favr',
  templateUrl: './favr.page.html',
  styleUrls: ['./favr.page.scss'],
})
export class FavrPage {

	priceSlideOpts:any = {
		slidesPerView: 3,
	    initialSlide: 0,
	    speed: 400,
	    freeMode: true
  	};
  	favrHistPop:any = 0;
    userDets:any;
    showPage:any = 0;
    favTrans:any;
    config:any;
  	constructor(private api:ApiService) { }
    ionViewDidEnter() {
      this.favrHistPop = 0;
      this.favTrans=[];
      this.config = JSON.parse(window.localStorage.getItem('config'));
      this.getUserDetails();
      this.getFavrTransacList();
    }


    getUserDetails(){
      this.api.getUserDetails()
      .then(resp => {
        this.userDets = resp;
        this.showPage = 1;
      })
      .catch(err => {

      });
    }

    getFavrTransacList(){
      // getFavrTransacList
      var data = {
        offset: 0,
        limit: 1000
      };
      this.api.getFavrTransacList(data)
      .then(resp => {
        this.favTrans = resp;
      })
      .catch(err => {
        console.log(err);
      });
    }

}
