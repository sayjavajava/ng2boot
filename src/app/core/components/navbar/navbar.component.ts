import { ProductUtil } from '../../../shared/common/ProductUtil';
import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/common/Product';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { MessageService } from '../../../shared/services/message.service';
import { Subscription } from 'rxjs/Subscription';
import { SigninComponent } from '../signin/signin.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  subscription  : Subscription;
  cartitem:ProductUtil[]=[];
  
  
  constructor( private matdialog:MatDialog,private cartservice: CartService,private authservice: AuthenticationService) { 

  }
  ngOnInit() {
    this.subscription = this.cartservice.shoppingcart.subscribe(msg=>this.cartitem=msg);          
   

  }

  Login() {
    let dialogRef = this.matdialog.open(SigninComponent, {
      height: '460px',
      width: '500px'
    });      

  }


}
