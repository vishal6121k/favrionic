import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
	showPage:any = 0;
	faqs:any;
	showCar:any = [];
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
  	this.getPageContent();
  }

  getPageContent(){
  	this.api.getFaqs()
  	.then( resp => {
  		this.faqs = resp.faqs;
  		var temp_key;
  		for (var key in this.faqs) {
  			// code...
  			temp_key = parseInt(key);
  			this.showCar[temp_key] = 0;
  			this.faqs[key]['number'] = temp_key;
  		}
  		this.showCar[0] = 1;
  		this.showPage = 1;
  	})
  	.catch( err => {

  	});
  }

}
