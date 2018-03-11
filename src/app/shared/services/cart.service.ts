import { ProductUtil } from '../common/ProductUtil';
import { Product } from '../common/Product';
import { Injectable } from '@angular/core';
import { MessageService } from './index';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class CartService {
  totalprice: number = 0;
  productcart: ProductUtil[] = [];
  result:number=0;
  constructor() {

  }
  IncreaseQuantity(product:ProductUtil){
    let productprice=product.price;
    var index = this.productcart.findIndex(item=>item.name === product.name);
     if(index > -1){
     this.productcart[index].cartquantity = this.productcart[index].cartquantity +1;  
     this.productcart[index].cartprice += product.price;
     this.updateIncreasePrice(productprice);
     
  }}
 DecreseQuantity(product:ProductUtil){
  let productprice=product.price;
 var index = this.productcart.findIndex(item=>item.name === product.name);
  if(index > -1){
  this.productcart[index].cartquantity = this.productcart[index].cartquantity - 1;  
  if(this.productcart[index].cartquantity === 0){ this.productcart[index].cartprice=0;   this.updateDecreasePrice(productprice);   return};
  this.productcart[index].cartprice -= product.price;
  this.updateDecreasePrice(productprice);
  
}
}
  shoppingcart: Subject<Array<ProductUtil>> = new BehaviorSubject<Array<ProductUtil>>([]);
  addtoCart(product: ProductUtil) {
    
    product.cartquantity = 1;
    product.cartprice=product.price;

    var index = this.productcart.findIndex(item => item.name === product.name);
    if (index > -1) {
      console.log('check in');
      this.productcart[index].cartquantity = this.productcart[index].cartquantity + 1;
      this.productcart[index].cartprice += product.price;
      console.log('price per item:' + this.productcart[index].price);
      this.updateIncreasePrice(product.price);  

    } else {
      // add the new item which dosen't exist
       this.productcart.push(product);
       this.shoppingcart.next(this.productcart);
       this.updateIncreasePrice(product.price);
     // this.getTotalPrice(product.quantity,product.price); 
    //   this.totalprice += product.price;
          }
    //    this.totalprice += product.price
    console.log(this.productcart);
  }
updateIncreasePrice(price:number){
  this.totalprice +=price;
}
updateDecreasePrice(price:number){
//if(price === 0){this.totalprice}
  this.totalprice -=price;

}
  removeProductFromCart(product: ProductUtil) {
    this.productcart.splice(this.productcart.indexOf(product), 1);
    this.totalprice -= product.price;
  }
  clearCart() {
    for (let p of this.productcart) {
      this.productcart.splice(this.productcart.indexOf(p), this.productcart.length);
      this.totalprice = 0;
      }
  }
   containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }
    return false;
}

}
