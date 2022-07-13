import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    let authInfo = {
      authenticated: true
    };

    if((window.localStorage.getItem('token'))) {
    	this.router.navigate(["choose"]);
  		return false;
    }
    return true;
  }
}