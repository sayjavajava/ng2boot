import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { DataService } from './DataService';

@Injectable()
export class CategoryService extends DataService  {
 private  auth :AuthenticationService
 

  constructor(http:Http,authservice:AuthenticationService,httpclient:HttpClient) {
   super('/api/allCategories',http,authservice,httpclient);
  }


}