import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favr',
  templateUrl: './favr.page.html',
  styleUrls: ['./favr.page.scss'],
})
export class FavrPage implements OnInit {

	priceSlideOpts:any = {
		slidesPerView: 3,
	    initialSlide: 0,
	    speed: 400,
	    freeMode: true
  	};
  	selectedPlan:any = 0;
  	buyFavrPop:any = 0;
  	favrHistPop:any = 0;
  	constructor() { }

  	ngOnInit() { }

}
