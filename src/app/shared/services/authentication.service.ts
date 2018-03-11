import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs/symbol/observable';
import { Authority } from '../common/Authority';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {

  private authUrl = '/api/auth';
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http) {
  
  }

  login(username: string, password: string): Observable<boolean> {
      // {headers: this.headers}
      return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              let token = response.json() && response.json().token;
              if (token) {
                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                  
                  console.log("tochi"+ localStorage.getItem("currentUser"));
                  // return true to indicate successful login
                  return true;
              } else {
                  // return false to indicate failed login
                  return false;
              }
          }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      console.log('i am logged out ');
  }
  isLoggedIn():boolean{
    let token =localStorage.getItem('currentUser') ;
    if(token){   return true}
    return false;
  }
currentUser(){
    const headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization':'Bearer'+ this.getToken()
    });
    const options = new RequestOptions({ headers: headers });

    let token =localStorage.getItem('currentUser') ;
    if(token){   
    return this.http.get('api/credentials',options)
    .map(response => response.json());
    }
}

 isAdmin(){
    const headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization':'Bearer'+ this.getToken()
    });
    const options = new RequestOptions({ headers: headers });

    let token =localStorage.getItem('currentUser') ;
    if(token){   
    return this.http.get('/api/isAdmin',options).map(response =>response.json());
}}
}