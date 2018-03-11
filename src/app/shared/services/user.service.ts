import { LoaderService } from './loader.service';
import { UsernameValidator } from '../common/UsernameValidator';
import { UserUtil } from '../common/UserUtil';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { DataService } from './DataService';
import { AppError } from '../common/AppError';
import { observable } from 'rxjs/symbol/observable';
import { BadRequest } from '../common/BadRequest';
import { NotFound } from '../common/NotFound';
import { WelcomeUser } from '../common/WelcomeUser';


@Injectable()
export class UserService {

  private UrlSource = 'http://localhost:8080/allheros';

  users: UserUtil[] = [];
  isLoading = true;
  constructor(private http: Http, private authenticationservice: AuthenticationService, private httpclient: HttpClient, private loaderservice?: LoaderService) {
  }
  getAll(): Observable<Array<UserUtil>> {
    return this.httpclient.get<Array<UserUtil>>('/api/allmyusers');
  }

  findAllUsers(): Observable<Array<UserUtil>> {
    this.showLoader();
    return this.httpclient.get('api/users')
      .map((data: any) => {
        this.hideLoader();
        return data._embedded.users as UserUtil[];
            });
  }

  create(resource): Observable<any> {
    return this.httpclient.post('/api/adduser', resource)
      //.map(response =>response.json())
      .catch(this.handleError);
  }

  createWithClient(resource) {
    return this.httpclient.post('/api/adduser', resource, { observe: 'response' })
      .catch(this.handleError);
  }

  delete(id: number) {
    return this.httpclient.delete('/api/deleteuser' + '/' + id, { observe: 'response' })

      //.map(response => response.json()) 
      .catch(this.handleError);
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



  //update scene
  findById(id: number): Observable<any> {
    return this.httpclient.get('/api/findUser' + '/' + id).catch(this.handleError);
  }
  updateUser(user: UserUtil, id: number) {
    return this.httpclient.put('/api/adduser' + '/' + id, user)
      // .map((res:Response) => res.json())
      .catch(this.handleError);

  }

  isAdmin() {
    let token = localStorage.getItem('currentUser');
    if (token) {
      return this.httpclient.get('/api/isAdmin');
    }
  }

  currentUser(): Observable<Array<WelcomeUser>> {
    let token = localStorage.getItem('currentUser');
    if (token) {
      return this.httpclient.get('api/credentials').map((data: any) => { console.log(data); return data as WelcomeUser[] });
    }
  }
  private showLoader(): void {
    this.loaderservice.show();
  }
  private hideLoader(): void {
    this.loaderservice.hide();
  }


}