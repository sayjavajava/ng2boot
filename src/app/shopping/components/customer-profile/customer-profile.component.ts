import { LoaderService } from '../../../shared/services/loader.service';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderState } from '../../../shared/common/Loading';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit,OnDestroy {
 

  Orders$;
  orderarr:any[]=[];
  filterdarray:any[]=[];
  openpanel:boolean=false;
  show:boolean=true;
  subscription: Subscription;
  
  constructor(private orderservice:OrderService,private loaderservice:LoaderService ) { }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
  ngOnInit() {
  //  this.Orders$ = this.orderservice.ordersByCurrentUser();
  this.orderservice.ordersByCurrentUser().subscribe(res=>{this.orderarr=res;console.log(res)});  
  this.subscription = this.loaderservice.loaderState
  .subscribe((state: LoaderState) => {
   this.show = state.show;
});    

  
 }
openItems(user){
this.filterdarray =[];
this.openpanel=true;
 console.log("orderid:" + user.orderid);
 this.filterdarray = this.orderarr.filter(x=>x.orderid === user.orderid);

 console.log("orderid:" + this.filterdarray.forEach(x=>console.log(x)));
 
}
closediv(){
  this.openpanel=false;
}

}
