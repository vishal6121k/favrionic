import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-loccart',
  templateUrl: './loccart.component.html',
  styleUrls: ['./loccart.component.scss'],
})
export class LoccartComponent implements OnInit {
	@Input() show:any;
	@Input() cart:any = 0;
	@Output() searchBtnClicked:EventEmitter<string> = new EventEmitter<string>();

	locpop:any = 0;
  	constructor() { }

  	ngOnInit() {
  	}

  	searchClicked(){
  		this.searchBtnClicked.emit('1');
  	}

}
