import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  

  constructor( private router: Router) {

  }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) { return true; }else
    console.log('urlstr2:' + state.url);
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
//    this.router.navigate(['login']), {queryParams : {returnUrl:state.url} };
    return false;
  }

}
