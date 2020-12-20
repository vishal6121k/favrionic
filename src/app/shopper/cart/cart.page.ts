import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
	selectedLoc:any = 0;
	locPop:any = 0;
	infoPop:any = 0;
  constructor() { }

  ngOnInit() {
  }

}
