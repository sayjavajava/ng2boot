import { ConfirmationdialogComponent } from '../../../shared/components/confirmationdialog/confirmationdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/common/Order';
import { ProductUtil } from '../../../shared/common/ProductUtil';
import { CartService } from '../../../shared/services/cart.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CloseDialogComponent } from '../../../shared/components/close-dialog/close-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
rForm:FormGroup;
productcart :ProductUtil[]=[];
totalprice:number=0;
constructor(private fb:FormBuilder,private cartService: CartService,private router:Router,private dialog:MatDialog,private orderservice ?:OrderService) { }

  ngOnInit() {
    this.productcart = this.cartService.productcart;
    this.totalprice = this.cartService.totalprice;
    this.rForm = this.fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'city': [null, Validators.compose([Validators.required])],
      'address': [null, Validators.required],
      'phone': [null, Validators.required]
    });

  }
  openDialog() {
    const dialogRef = this.dialog.open(CloseDialogComponent, {
      height: '200px',
      width:'300px'
    });
  }

  PalaceOrder(data){
   // username:string,price:number,itemprice:number,cartquantity:number,cartprice:number,city:string,phonenumber:number,address:string){
     if(this.rForm.valid){
      let order :Order= new Order(data.username,this.totalprice,this.productcart[0].cartquantity ,this.productcart[0].cartprice,data.city,data.phonenumber,data.address,this.productcart);  
       console.log('quantity:' + this.productcart[0].cartquantity);
       this.orderservice.palaceOrder(order).subscribe(res=>{console.log('dataa'+res)});
       
       this.router.navigate(['profile']);
      }else{this.openDialog();}
}

}
