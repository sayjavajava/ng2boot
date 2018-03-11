import { ProductUtil } from '../../../shared/common/ProductUtil';
import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/common/Product';
import { MessageService } from '../../../shared/services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit,OnDestroy{
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cartitem: ProductUtil[] = [];
  subscription: Subscription;
  totalprice: number = 0;
  cartsize: number = 0;

  constructor(private cartservice: CartService) {
    this.subscription = this.cartservice.shoppingcart.subscribe(msg => { this.cartitem = msg; console.log(msg) });

  }
  ngOnInit() {
    this.totalprice = this.cartservice.totalprice;
    this.cartsize = this.cartservice.productcart.length;
    }
  clearCart() {
    this.cartservice.clearCart();
  }
  DecreaseQuantity(post){
    this.cartservice.DecreseQuantity(post);
    this.totalprice=this.cartservice.totalprice; 
}
 IncreaseQuantity(post){
  this.cartservice.IncreaseQuantity(post);
  this.totalprice=this.cartservice.totalprice; 
}


}
