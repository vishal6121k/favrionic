import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seldrop',
  templateUrl: './seldrop.page.html',
  styleUrls: ['./seldrop.page.scss'],
})
export class SeldropPage implements OnInit {

	defDist:any = 5;
  constructor() { }

  ngOnInit() {
  }

  changeDist(event){
  	this.defDist = event.detail.value;
  }

}
