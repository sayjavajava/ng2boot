import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatTableModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ProductPageComponent } from 'shared/components/product-page/product-page.component';

import { HomeComponent } from '../core/components/home/home.component';
import { SigninComponent } from '../core/components/signin/signin.component';
import { SignupComponent } from '../core/components/signup/signup.component';
import { CheckOutComponent } from '../shopping/components/check-out/check-out.component';
import { CustomerProfileComponent } from '../shopping/components/customer-profile/customer-profile.component';
import { ShoppingCartItemComponent } from '../shopping/components/shopping-cart-item/shopping-cart-item.component';
import { CloseDialogComponent } from './components/close-dialog/close-dialog.component';
import { ConfirmationdialogComponent } from './components/confirmationdialog/confirmationdialog.component';
import { ViewOrderDialogComponent } from './components/view-order-dialog/view-order-dialog.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { CartService } from './services/cart.service';
import { CategoryService } from './services/category.service';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { LoaderService } from './services/loader.service';
import { MessageService } from './services/message.service';
import { ProductService } from './services/product.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    

    MatMenuModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,    
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSnackBarModule,

    MatProgressBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    RouterModule.forChild([
     // {path : 'login', component: LoginComponent},
      {path : 'signup', component: SignupComponent},

      {path: 'cart', component: ShoppingCartItemComponent},
      {path: 'checkout', component: CheckOutComponent,canActivate: [AuthGuard]},

      {path: 'vieworder', component:ViewOrderDialogComponent},
      {path: 'profile', component: CustomerProfileComponent,canActivate: [AuthGuard]},
      

    ])

  ],
  declarations: [

    ProductPageComponent,

    ViewOrderDialogComponent,
    
    CloseDialogComponent,
    ConfirmationdialogComponent,
    



  ],
  exports:[
    
    ProductPageComponent,
   

    CloseDialogComponent,
    ConfirmationdialogComponent,
    ViewOrderDialogComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    BrowserAnimationsModule,

    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,    
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,

    MatProgressBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,


  ],
  providers:[
    MessageService,ConfirmDialogService,CartService,LoaderService,
    AuthenticationService, CategoryService, ProductService, AuthGuard
  ]
})
export class SharedModule { }
