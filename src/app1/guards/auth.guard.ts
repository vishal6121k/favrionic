import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MiscService } from '../services/misc.service';

declare var require: any;
const axios = require('axios').default;
axios.defaults.headers.common['Content-Type'] = 'application/json'; // for POST requests
const apiUrl = "http://api.favr.ie/api/";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private router:Router, private misc: MiscService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    	// return true;
      // console.log(route['_routerState'].url);
    	return this.checkLogin(route['_routerState'].url);
  	}


  	async checkLogin(route){
      console.log(route);
  		var token = localStorage.getItem('token');
      	if(token){
        	axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
      	}

  		return await axios.get(apiUrl + 'users')
	    .then(response => {

        if(!(response.data.user_redirect_url == "") && route != response.data.user_redirect_url){
          this.router.navigate([response.data.user_redirect_url]);
            return false;
        }
        
        this.misc.setUserDets(JSON.stringify(response.data));
        // if(response.data.user_type == 3 && response.data.lang_count == 0 && !(route === '/provider/select-language')){
        //   this.router.navigate(['/provider/select-language']);
        //   return false;
        // }
        // else if((route === '/provider/select-language') && response.data.lang_count > 0){
        //   this.router.navigate(['/provider/home']);
        //   return false;
        // }
        return true;
	    })
	    .catch(err => {
	    	// console.log(err.response.status);
	    	if(err.response.status == 401){
          if(route =='/shopper' || route =='/shopper/home' || route =='/shopper/home/search' || route =='/shopper/cart'){
            return true;
          }
	    		console.log('not logged in');
	    		this.router.navigate(['/login']);
	      	return false;
	    	}
	    	else{
	    		return true;
	    	}
	    });
  	}
  
}
