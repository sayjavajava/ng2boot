import { MessageService } from '../../../shared/services/message.service';
import { Sku } from '../../../shared/common/sku';
import { FormValidator } from '../../../shared/common/FormValidator';
import { ProductService } from '../../../shared/services/product.service';
import { Category } from '../../../shared/common/Category';

import { UserService } from '../../../shared/services/user.service';
import { UploadFileService } from '../../services/upload-file.service';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { NotFound } from '../../../shared/common/NotFound';
import { AppError } from '../../../shared/common/AppError';
import { BadRequest } from '../../../shared/common/BadRequest';
import { CategoryService } from '../../../shared/services/category.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  rForm :FormGroup;
  name:String;
  originalFileName:string;
  
  selectedCategory:any;
  active:boolean=true;
  submitted:boolean=false;

  static skuitems: any[] = [];
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  quantity:number[];

  items: Category[];
  

  categoriesItem=[
    {id:1,name:"computer"},
    {id:2,name:"Lcd"},
    {id:3,name:"mobile"},
    {id:4,name:"camera"},
  ]


  constructor(
    private fb : FormBuilder,  
    private router : Router,
      private productservice : ProductService,
      private snackbar:MatSnackBar,
      private uploadfileservice :UploadFileService,
      private categoryservice:CategoryService,
      private messageservice : MessageService,
      //      private heroservice?:HeroService 
    ) {

      }

  ngOnInit() {
   this.messageservice.loadAllSku();     
   this.categoryservice.getAll().subscribe(res => this.items = res); 

  let obj = new FormValidator(this.productservice,this.messageservice);
  
  var N = 10; 
  this.quantity =Array.apply(null, {length: N}).map(Number.call, Number);
   
     //pattern for validate only lettere [a-zA-Z_]+
   //pattern for only numbers [0-9]+
     this.rForm =this.fb.group({  
    'name': [null,Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(4)])],
    'description':[null,Validators.compose([Validators.required,Validators.maxLength(20),Validators.minLength(8)])],
    'selectedCategory':[null,Validators.required],
    'price':[null,Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(8)])],
    'InStock':[null],
    'originalFileName':[null],
    'sku': new FormControl('',Validators.required,FormValidator.SkuExists),
      quantity:[null,Validators.required]
        // 'imageUrl':[null,Validators.required],
    })
  
  }
AddProduct(post){

post.originalFileName =this.originalFileName;

if(this.rForm.valid){
  this.productservice.create(post).subscribe(response =>{
  //  hero['id'] = response.json().id;

  this.upload();
   this.openSnackBar("Product saved","successfully");
   this.router.navigate[('/')];
   this.rForm.reset();
  this.active=false;

  setTimeout(() => this.active = true, 0);
  
  },(error :AppError) =>{
  if(error instanceof BadRequest){
    console.log('orig'+error.origionalerror);
    alert("please check your data format ");
  }else  throw error;
})
}
}
openSnackBar(message: string, action: string) {
  this.snackbar.open(message, action, {
    duration: 2000,
  });
}
selectFile(event) {
  const file = event.target.files.item(0)
  if (file.type.match('image.*')) {
    this.selectedFiles = event.target.files;
    let file= event.target.files[0];
 // let filename = file.name;
   this.originalFileName=file.name;
   } else {
    alert('invalid format!');
  }
}

upload() {
  this.progress.percentage = 0;
  this.currentFileUpload = this.selectedFiles.item(0)
  this.productservice.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      console.log('File is completely uploaded!');
    this.currentFileUpload=null
    }
  })
 this.selectedFiles = undefined;
}

}
