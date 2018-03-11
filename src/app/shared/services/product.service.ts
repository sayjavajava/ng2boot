
import { ProductUtil } from '../common/ProductUtil';
import { Sku } from '../common/sku';
import { AuthenticationService } from './authentication.service';
import { NotFound } from '../common/NotFound';
import { BadRequest } from '../common/BadRequest';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';


import { AppError } from '../common/AppError';
import { observable } from 'rxjs/symbol/observable';
import { Product } from '../common/Product';

@Injectable()
export class ProductService {

  doctors = [];

  private UrlSource = '/api/product';
  private UrlSku = '/api/sku';
  private UrlProductCategory = '/api/productbycategory/';
  private UrlAllProducts = '/api/allproducts';
  private UrlProducts = '/api/products';
  //private constr :string;
  constructor(private http: Http, private authenticationservice: AuthenticationService, private httpclient: HttpClient) {
    //   this.getConversion();
  }
  getSku() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.authenticationservice.getToken()
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.UrlSku, options)

      .map(response => response.json())
      .catch(this.handleError);
  }

  getConversion() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.authenticationservice.getToken()
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.UrlSku, options)
      .flatMap((response) => response.json())
      .subscribe((data) => {
        this.doctors.push(data);
      });

  }
  getAll() {
    return this.httpclient.get(this.UrlAllProducts)
      .map((data: any) => {
        return data;
      });
  }

  create(resource) {
    //const hero = {name : resource.value};
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.authenticationservice.getToken()
    });
    const options = new RequestOptions({ headers: headers });
    console.log('sending ....data ...to serve ..');
    return this.http.post(this.UrlSource, JSON.stringify(resource), options)
      //.map(response =>response.json())
      .catch(this.handleError);
  }

  delete(id: number) {
    return this.httpclient.delete('/api/deleteproduct' + '/' + id);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadRequest());
    }
    if (error.status === 404) {
      return observable.throw(new NotFound());
    } else
      return Observable.throw(new AppError(error));
  }

  //fileuploading

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.authenticationservice.getToken()
    });
    const options = new RequestOptions({ headers: headers });

    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', '/api/post', formdata, {
      reportProgress: true,

      responseType: 'text'
    });

    return this.httpclient.request(req);
  }
  getProductsByCategory(): Observable<ProductUtil[]> {
    let pagesize: number = 0;
    let size: number = 5;

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.authenticationservice.getToken()
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.UrlProducts + '?' + 'page=' + pagesize + '&' + 'size=' + size, options)
      .map(response => response.json())
      .catch(this.handleError);
  }

  findAllProducts(pageindex: number, sz: number): Observable<Array<ProductUtil>> {
    let pagestart: number = pageindex;
    let size: number = sz;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.authenticationservice.getToken()
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.UrlProducts + '?' + 'page=' + pagestart + '&' + 'size=' + size, options)
      .map(response => response.json())
      .map((data: any) => {
        return data._embedded.products as ProductUtil[];
      });
  }
  //findbyproduct


  findById(id: number): Observable<any> {

    return this.httpclient.get('/api/findProductById' + '/' + id).catch(this.handleError);
  }

  // updateproduct
  updateProduct(id: number, product: Product) {
    console.log('idd:' + id);
    return this.httpclient.put('/api/updateproduct' + '/' + id, product)
  }
}