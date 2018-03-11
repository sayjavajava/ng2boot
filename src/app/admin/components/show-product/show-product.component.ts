import { ConfirmDialogService } from '../../../shared/services/confirm-dialog.service';
import { ConfirmationdialogComponent } from '../../../shared/components/confirmationdialog/confirmationdialog.component';
import { Router } from '@angular/router';
import { ProductUtil } from '../../../shared/common/ProductUtil';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, PageEvent, MatSort, MatDialog, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core';
import { MessageService } from '../../../shared/services/index';
import { UpdateProductComponent } from '../update-product/update-product.component';


@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',      
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit ,OnDestroy {
  displayedColumns = ['name','price','description','instock','category','Edit','Delete'];
  
  dialogRef: MatDialogRef<ConfirmationdialogComponent>;
  static sizenumber :number =8;
//i dont know what does meant by this follwoing line
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  message:any;
  subscription : Subscription;


  pageEvent: PageEvent;
  datasource: null;
  pageIndex:number;
  pageSize:number;
  length:number;

  dataSource = new UserDataSource(this.productservice,0,5);
  public getServerData(event?:PageEvent){console.log(event.pageIndex)
  
    this.dataSource = new UserDataSource(this.productservice,0,event.pageSize);
  }
  constructor(private messageService : MessageService,private matdialog: MatDialog,private dialogservice:ConfirmDialogService ,private router:Router,private productservice ?:ProductService) { 

    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message;console.log(message) });
    
  }

  @ViewChild(MatSort) sort: MatSort;
  

    ngAfterViewInit() {
      console.log(this.sort);
    }
  
    editUserPage(product:ProductUtil) {
      if (product) {
       this.matdialog.open(UpdateProductComponent,{data:product.id,
        height: '70%',
        width: '70%'
      });
      //  this.router.navigate(['/user/edit', user.id]);
       }
    }
     openConfirmationDialog(products) {
      this.dialogservice
      .confirm('Delete', 'Are you sure you want to do this?')
      .subscribe(res => {
      
        if(res)
        this.productservice.delete(products.id).subscribe(data=>console.log(data));  
       
      });
    }
 
    closeDialog(){
      this.matdialog.closeAll();
     }

    ngOnInit() {

    this.pageEvent = new PageEvent;
    this.pageEvent.pageIndex = 0;
//    this.pageEvent.length = this.posts.length;
    console.log('pageEvent', this.pageEvent.pageIndex);
    console.log('pageEvent', this.pageEvent.pageSize); 
  }

   ngOnDestroy(){
     this.subscription.unsubscribe();
   }
  }
  export class UserDataSource extends DataSource<any> {
  
    constructor(private productservice: ProductService,private pageindex:number,private size:number) {
      super();
    }
    connect(): Observable<ProductUtil[]> {
      
   //testing server  with hardcoded value;
   //i want here more params for etc page, size,sort    
      return this.productservice.findAllProducts(this.pageindex,this.size);
    }


    disconnect() {}
  }
  