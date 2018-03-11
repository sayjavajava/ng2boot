import { ProductUtil } from '../../../shared/common/ProductUtil';
import { Category } from '../../../shared/common/Category';

import { FormValidator } from '../../../shared/common/FormValidator';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take'; 
import { Product } from '../../../shared/common/Product';
import { MatSnackBar, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  
  product:ProductUtil[] = [];   
  id:number;
  tempid:number;
  categories$;
  rForm:FormGroup;
  item:Category[] = [];
  quantity:number[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) data:any, private fb:FormBuilder,private router:Router,private route:ActivatedRoute,
  private productservices:ProductService,private matsnack:MatSnackBar,private categoryservice:CategoryService,private dialogRef:MatDialogRef<UpdateProductComponent>) { 
    this.id=data;
    this.tempid=data;
    console.log(data);
   this.categories$=this.categoryservice.getAll();
 //   this.id = this.route.snapshot.paramMap.get('id');
 
    if (this.id) {this.productservices.findById(this.id).subscribe(p => {this.product = p;console.log(p)})};
  }

  ngOnInit() {
    var N=10;
    this.categoryservice.getAll().subscribe(res => this.item = res); 
    this.quantity =Array.apply(null, {length: N}).map(Number.call, Number);
    

    this.rForm =this.fb.group({  
      'name': [null,Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(4)])],
      'selectedCategory':[null,Validators.required],
      'price':[null,Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(8)])],
      'InStock':[null],
       'image_url':[null,Validators.required],
       quantity:[null,Validators.required]
         })

      // this.sub = this.route.params.subscribe(params => {
      //   this.id = params['id'];
      // });

      if (this.id) { //edit form
        this.productservices.findById(this.id).subscribe(
          product => {
              this.id = product[0].id;
              this.rForm.patchValue({
              name: product[0].name,
              price: product[0].price,
              selectedCategory:product[0].category,
              InStock:product[0].instock,
              image_url:product[0].image_url,
              quantity:product[0].quantity,
                      //  changerole:user[0].auth,          
            });
           },error => {
            console.log(error);
           }
        );
      }
  }
  UpdaetProduct(post){
    if(this.rForm.valid){
      let product :Product = new Product(this.id,post.name,post.InStock,post.image_url,post.quantity,post.price,post.selectedCategory);

      this.productservices.updateProduct(this.tempid,product).subscribe(data=>console.log()),error => {
        console.log(error);
       };  
      this.openSnackBar('Updated','Successfully');
      this.dialogRef.close();
      this.router.navigate(['/home']);
      
            }else{alert('forget')}
  
  }
  
  openSnackBar(message: string, action: string) {
    this.matsnack.open(message, action, {
      duration: 2000,
    });
  }


}
