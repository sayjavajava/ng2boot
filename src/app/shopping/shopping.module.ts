import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { ShoppingCartItemComponent } from './components/shopping-cart-item/shopping-cart-item.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ProductPageComponent } from '../shared/components/product-page/product-page.component';
import { SharedModule } from './../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
  SharedModule   
  ],
  declarations: [


    CheckOutComponent,
    ShoppingCartItemComponent,
    CustomerProfileComponent,
  ]
})
export class ShoppingModule { }
