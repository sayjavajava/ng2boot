import { ViewOrderDialogComponent } from '../../../shared/components/view-order-dialog/view-order-dialog.component';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../../shared/common/Order';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit {
   allorders:any[]=[];
   filteredarray:any[]=[];
   openpanel:boolean=false;
   rForm :FormGroup;
   

  displayedColumns = ['orderNumber','Order Price','createdOn','Status','View Detail','Edit'];
  dataSource = new OrderDataSource(this.orderservice);
  
  constructor(private orderservice :OrderService,private router:Router,private matdialog:MatDialog) { }

  ngOnInit() {

    this.orderservice.findAllOrders().subscribe(rep=>this.allorders=rep);  
  }

  ChangeStatus(order) {
    this.filteredarray = this.allorders.filter(x => x.orderNumber === order.orderNumber);
    this.openpanel = true;
  }

  closediv(){
    this.openpanel=false;
  }

  ViewDetail(user) {
    var path = user._links.order.href;
    var splitpath = path.split('/')[5];

    if (splitpath) {
      this.matdialog.open(ViewOrderDialogComponent, { data: splitpath });
    }

  }
}

export class OrderDataSource extends DataSource<any> {
  constructor(private orderervice: OrderService) {
    super();
   
  }
  connect(): Observable<Order[]> {
   return this.orderervice.findAllOrders();
            }
  disconnect() {}
          }

