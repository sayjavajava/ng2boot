import { LoaderService } from '../../../shared/services/loader.service';
import { Subscription } from 'rxjs/Subscription';
import { UpdateRoleComponent } from '../update-role/update-role.component';
import { MatDialog, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import {  } from '../../../shared/common';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/table';
import { UserUtil } from '../../../shared/common/UserUtil';
import { CategoryService } from '../../../shared/services/category.service';
import { NotFound } from '../../../shared/common/NotFound';
import { AppError } from '../../../shared/common/AppError';
import { BadRequest } from '../../../shared/common/BadRequest';
import { UserService } from '../../../shared/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { LoaderState } from '../../../shared/common/Loading';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {

  displayedColumns = ['Name','Email','Active','Authorities','Edit','Delete'];
  is: boolean;
  userslist: UserUtil[] = [];
  value: any[];
  static urlarray;
  subscription :Subscription;
  isLoading:boolean;
  pageEvent: PageEvent;
  pageSize = 10;
  show:boolean=true;
  pageSizeOptions: Array<number> = [5, 10, 25, 100];

  dataSource = new UserDataSource(this.userservice);
  constructor(private userservice : UserService, private router : Router, private matdialog : MatDialog,private loaderservice:LoaderService) {
    UserComponent.urlarray = true;
   // this.subscription =this.messageservice.isLoadingGet();
      this.subscription = this.loaderservice.loaderState
      .subscribe((state: LoaderState) => {
       this.show = state.show;
   });    
  }

  get staticUrlArray(): boolean {
    return UserComponent.urlarray;
  }
  myEvent(event) {
    console.log(event);
  }

  delete(user) {
    if (user.id) {
      this.userservice.delete(user.id).subscribe(data => console.log(data));
      this.router.navigate(['/home']);
    }
  }

  addUser(input: HTMLInputElement) {
    let hero = { name: input.value }

    this.userservice.create(input).subscribe(response => {
      //  hero['id'] = response.json().id;
      this.value.splice(0, 0, hero);
      input.value = '';
    }, (error: AppError) => {
      if (error instanceof BadRequest) {
        console.log('orig' + error.origionalerror);
        alert("please check your data format ");
      } else throw error;
    })

  }
  editUserPage(user: UserUtil) {
    if (user) {
      this.matdialog.open(UpdateRoleComponent, { data: user.id });
      //  this.router.navigate(['/user/edit', user.id]);
    }
  }

  closeDialog() {
    this.matdialog.closeAll();
  }
  ngOnInit() {
    UserComponent.urlarray = false;
    console.log('flag'+this.show);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

}

export class UserDataSource extends DataSource<any> {
  constructor(private userservice: UserService) {
    super();
  }
  connect(): Observable<UserUtil[]> {
     return this.userservice.findAllUsers();
    
    }
   
  disconnect() { }
}
