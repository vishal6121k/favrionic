import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

declare var require: any;
const axios = require('axios').default;
axios.defaults.headers.common['Content-Type'] = 'application/json'; // for POST requests
const apiUrl = "http://api.favr.ie/api/";

@Injectable({
  providedIn: 'root'
})

export class NoauthGuard implements CanActivate {
	constructor(private router:Router) { }
  	canActivate(
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    	return this.checkLogin();
  	
  	}

  	async checkLogin(){
  		
  		var token = localStorage.getItem('token');
      	if(token){
        	axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
      	}

  		return await axios.get(apiUrl + 'users')
	    .then(response => {
	    	// console.log(response);
	    	// if(response.data.user_type == 2){
	    		this.router.navigate(['/choose']);
	    	return false;
	    	// }
	    	// else{
	    		// this.router.navigate(['/provider/home']);
	    	// }
	    	// this.router.navigate(['/login']);
	    })
	    .catch(err => {
	    	// console.log(err.response.status);
	    	if(err.response.status == 401){
	    		console.log('not logged in');
	    		// this.router.navigate(['/login']);
	      		return true;
	    	}
	    	else{
	    		return false;
	    	}
	    });
  		// userProfile
  	}
  
}
