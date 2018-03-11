import { CartService } from '../../services/cart.service';

import { observable } from 'rxjs/symbol/observable';
import { Category } from '../../common/Category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductUtil } from '../../common/ProductUtil';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Product } from '../../common/Product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  products:any[]= [];
  categories: Category[];
  productsDisplayed:number;
  category:string;
  filteredPoducts:any[]=[];
  
  constructor(private route:ActivatedRoute,
    private productservice: ProductService, private categoryservice: CategoryService,private cartservice:CartService) {
      
    this.productservice.getAll().switchMap(data => {
    this.products = data;
      return this.route.queryParamMap;
    })
      .subscribe(param => {
        this.category = param.get('category');
        this.filteredPoducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;

      });
    this.categoryservice.getAll().subscribe(data => this.categories = data)

  }

  ngOnInit() {
  }
  public addProductToCart(productadd){
    console.log('i am added');
    this.cartservice.addtoCart(productadd);   

  }
  
}
