import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	user_type:any = 1;
  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event){

  }

}
