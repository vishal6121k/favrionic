import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let authInfo = {
      authenticated: true
    };

    if((window.localStorage.getItem('user_type'))) {
    	if((window.localStorage.getItem('user_type')) == '2'){
    		this.router.navigate(["/shopper"]);
  			return false;
    	}
    	if((window.localStorage.getItem('user_type')) == '3'){
    		this.router.navigate(["/dropper"]);
  			return false;
    	}
    }
    // if (!authInfo.authenticated) {
    // }
    console.log(route);
    return true;
  }
}
