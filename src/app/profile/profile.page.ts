import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	user_type:any = 1;
  	constructor(private router: Router) { }

  	ngOnInit() { }

  	segmentChanged(event){ }

  	logoutUser(){
  		window.localStorage.removeItem('user_type');
  		window.localStorage.removeItem('token');
  		this.router.navigate(['/']);
  	}

}
