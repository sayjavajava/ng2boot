import { SharedModule } from './../shared/shared.module';
import { ProductComponent } from './components/product/product.component';

import { SignupComponent } from '../core/components/signup/signup.component';
import { ViewOrderDialogComponent } from './../shared/components/view-order-dialog/view-order-dialog.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UpdateProductComponent } from './components/update-product/update-product.component';


import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { UploadFileService } from './services/upload-file.service';

import { UserComponent } from './components/user/user.component';
import { ShowProductComponent } from './components/show-product/show-product.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { AuthGuard } from 'shared/services/auth-guard.service';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
   SharedModule,
    RouterModule.forChild([
      {path: 'orders', component: ManageOrderComponent},
      {path: 'vieworder', component:ViewOrderDialogComponent},

      {path : 'update', component: UpdateRoleComponent},
      {path: 'user/edit/:id', component: SignupComponent},
      {
        path : 'ShowProducts',
        component: ShowProductComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {path : 'productadd', component: ProductComponent},
  

    ])


  ],
  declarations: [
    ProductComponent,
    UserComponent,
    UpdateRoleComponent,
    ShowProductComponent,
    UpdateProductComponent,
    ManageOrderComponent
  ],
  
  providers:[
    UploadFileService, AdminAuthGuard
  ]
})
export class AdminModule { }
