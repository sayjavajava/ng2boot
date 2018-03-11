import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatInputModule, MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { AdminModule } from './admin/admin.module';
import { ManageOrderComponent } from './admin/components/manage-order/manage-order.component';
import { UpdateProductComponent } from './admin/components/update-product/update-product.component';
import { UpdateRoleComponent } from './admin/components/update-role/update-role.component';
import { UserComponent } from './admin/components/user/user.component';
import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { LoginComponent } from './core/components/login/login.component';
import { SigninComponent } from './core/components/signin/signin.component';
import { SignupComponent } from './core/components/signup/signup.component';
import { CoreModule } from './core/core.module';
import { AppErrorHandler } from './shared/common/AppErrorHandler';
import { TokenInterceptor } from './shared/common/TokenInterceptor';
import { CloseDialogComponent } from './shared/components/close-dialog/close-dialog.component';
import { ConfirmationdialogComponent } from './shared/components/confirmationdialog/confirmationdialog.component';
import { ProductPageComponent } from './shared/components/product-page/product-page.component';
import { ViewOrderDialogComponent } from './shared/components/view-order-dialog/view-order-dialog.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { OrderService } from './shared/services/order.service';
import { UserService } from './shared/services/user.service';
import { SharedModule } from './shared/shared.module';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { CustomerProfileComponent } from './shopping/components/customer-profile/customer-profile.component';
import { ShoppingCartItemComponent } from './shopping/components/shopping-cart-item/shopping-cart-item.component';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule(<NgModule>{
  declarations: [
    AppComponent,


    ChartsComponent,

  ],
 entryComponents: [UpdateRoleComponent, UpdateProductComponent, SigninComponent, ConfirmationdialogComponent,CloseDialogComponent,ViewOrderDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    AdminModule,
    CoreModule,
    ShoppingModule,

    MatMenuModule,
    MatToolbarModule,



    MatProgressBarModule,
    FlexLayoutModule,

    Ng2Charts,
    RouterModule.forRoot([
      {path : '', component: ProductPageComponent},

      {path : 'user', component: UserComponent},
      {path : 'home', component: ProductPageComponent},
      {path : 'login', component: LoginComponent},
      {path : 'signup', component: SignupComponent},
     // {path : 'update', component: UpdateRoleComponent},
     // {path: 'user/edit/:id', component: SignupComponent},
      {path: 'chart', component: ChartsComponent},

      {path: 'cart', component: ShoppingCartItemComponent},
      {path: 'checkout', component: CheckOutComponent,canActivate: [AuthGuard]},
      {path: 'productcatalog', component: ProductPageComponent},
      {path: 'orders', component: ManageOrderComponent},
      {path: 'vieworder', component:ViewOrderDialogComponent},
      {path: 'profile', component: CustomerProfileComponent,canActivate: [AuthGuard]},
      
      // {
      //   path : 'ShowProducts',
      //   component: ShowProductComponent,
      //   canActivate: [AuthGuard, AdminAuthGuard]
      // },
      // {path : 'productadd', component: ProductComponent},
    ]),
    HttpModule,

  ],
  providers: [UserService,OrderService,
     

    {provide: ErrorHandler, useClass: AppErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    ],

  bootstrap: [AppComponent],


})
export class AppModule { }
