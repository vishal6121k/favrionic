import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

	page_type:any;
	pageContent:any;

	showPage:any = 0;

  	constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
        this.page_type = params['page_type'];
        this.getPageContent();
    });
  }


  getPageContent(){
  	var data ={
  		'page_type': this.page_type
  	};
  	this.api.getPages(data)
  	.then( resp => {
  		this.pageContent = resp.page;
  		this.showPage = 1;
  	})
  	.catch( err => {

  	});
  }

}
