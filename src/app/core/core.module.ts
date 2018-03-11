import { SharedModule } from './../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    // CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    // MatMenuModule,
    // FlexLayoutModule,
    // MatIconModule,
    // MatButtonModule,
    // MatSelectModule,
    // MatDialogModule,
    // MatCardModule,
    // MatDialogModule,
    // MatCheckboxModule,
    // MatToolbarModule,
    SharedModule,

    RouterModule.forChild([]),
  ],
  declarations: [
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,


  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
