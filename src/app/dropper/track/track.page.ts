import { Component, OnInit } from '@angular/core';

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
  cancPopCont:any = 0;
  constructor() { }

  ngOnInit() {
  }

}
