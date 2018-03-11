import { Order } from '../common/Order';
import { AppError } from '../common/AppError';
import { NotFound } from '../common/NotFound';
import { observable } from 'rxjs/symbol/observable';
import { Observable } from 'rxjs/Observable';
import { ProductUtil } from '../common/ProductUtil';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BadRequest } from '../common/BadRequest';
import { LoaderService } from './loader.service';


@Injectable()
export class OrderService {

  private orderUrl: string;
  constructor(private httpclient: HttpClient, private loaderservice?: LoaderService) {
  }
  palaceOrder(product: any) {
    console.log('i am in order');
    //     this.httpclient.post('api/palaceorder',product,{observe: 'response'});
    return this.httpclient.post('/api/palaceorder', product, { observe: 'response' })
      .catch(this.handleError);
  }

  findAllOrders(): Observable<Array<Order>> {
    return this.httpclient.get('api/orders')
      .map((data: any) => {
        return data._embedded.orders as Order[];
      });
  }

  findByOrderNumber(ordernumber: number): Observable<Order> {
    return this.httpclient.get('api/getOrdersByOrderNumber' + '/' + ordernumber).map((data: any) => { return data as Order });
  }

  AllOrderedItems(url): Observable<Array<Order>> {
    return this.httpclient.get(url)
      .map((data: any) => {
        return data._embedded.orderItems as Order[];
      });
  }

  ordersByCurrentUser(): Observable<any[]> {
    this.showLoader();
    return this.httpclient.get('/api/findOrderByCustomer')
      .map((data: any) => {
        this.hideLoader();
        return data as any[];
      });
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadRequest());
    }
    if (error.status === 404) {
      return Observable.throw(new NotFound());
    } else
      return Observable.throw(new AppError(error));
  }
  private showLoader(): void {
    this.loaderservice.show();
  }
  private hideLoader(): void {
    this.loaderservice.hide();
  }



}

