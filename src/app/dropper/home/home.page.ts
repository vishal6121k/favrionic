import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	notePop:any = 0;
	dropPop:any = 0;
	defDist:any = 5;
  constructor() { }

  ngOnInit() {
  }

  changeDist(event){
  	this.defDist = event.detail.value;
  }

}
