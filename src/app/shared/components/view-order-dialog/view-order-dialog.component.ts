import { Order } from '../../common/Order';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../../services/order.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-order-dialog',
  templateUrl: './view-order-dialog.component.html',
  styleUrls: ['./view-order-dialog.component.css']
})
export class ViewOrderDialogComponent implements OnInit {
  orderid:number;
  OrderedItemarr$;
  OrderedItem:any[]=[];
  constructor( @Inject(MAT_DIALOG_DATA) data:any,private orderservice: OrderService) {
   this.orderid=data;
   }

  ngOnInit() {
    var path='/api/orders/'+this.orderid+'/'+'items';
    console.log(path);
   this.orderservice.AllOrderedItems(path).subscribe(res=>{this.OrderedItem=res;console.log(res)
  
  }

);

}

test(){
  console.log('len'+this.OrderedItem.length);
  console.log('len'+this.OrderedItem.forEach(x=>console.log("test"+x)));
}
  



}
