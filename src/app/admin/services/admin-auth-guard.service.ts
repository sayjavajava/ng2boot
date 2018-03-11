import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../shared/services/message.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuard  implements CanActivate{
  testadmin: boolean;
  
  value:any[]=[];

 
  constructor(private router:Router, private userservice:UserService,private authenticationservice : AuthenticationService) { 
 //   this.isAdmin();
  
}


canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
  return this.userservice.isAdmin().map(e => {
      if (e) {
          return true;
      }else
      this.router.navigate(['login'], {queryParams: { returnUrl: state.url }});
  })
        
  // console.log('can');
  //  if(this.userservice.isAdmin()){
  //   console.log('admin'+ this.userservice.isAdmin()); 
  //   return true;}
           
  //else{ this.router.navigate(['login']); }
}   
  // isAdmin(){
  //   return this.authenticationservice.isAdmin().subscribe(res=>
  //     this.testadmin=res);
  // //    console.log(res),error =>console.log(error));
  // }
}
