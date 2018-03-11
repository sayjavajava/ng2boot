import { AuthenticationService } from './authentication.service';
import { NotFound } from '../common/NotFound';
import { BadRequest } from '../common/BadRequest';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';


import { AppError } from '../common/AppError';
import {observable} from 'rxjs/symbol/observable';


@Injectable()
export class DataService {

//  private UrlSource = 'http://localhost:8080/allheros';


private constr :string;
  constructor(private UrlSource :string ,private http: Http,private authenticationservice :AuthenticationService,private httpclient:HttpClient) {
    
  }
   getAll() {
     console.log('wooo');
      const headers = new Headers({ 'Content-Type': 'application/json',
    'Authorization':'Bearer'+ this.authenticationservice.getToken()
     });
      const options = new RequestOptions({ headers: headers });
     return this.http.get(this.UrlSource,options)
      .map(response => response.json())
      .catch(this.handleError);
  }
create(resource){
  //const hero = {name : resource.value};
  const headers = new Headers({ 'Content-Type': 'application/json',
  'Authorization':'Bearer'+ this.authenticationservice.getToken()
  });
  const options = new RequestOptions({ headers: headers });
  console.log('sending ....data ...to serve ..');
return  this.http.post(this.UrlSource, JSON.stringify(resource), options)
//.map(response =>response.json())
.catch(this.handleError);
}

delete(user){
  return  this.http.delete(this.UrlSource + '/' + user.id)
  //.map(response => response.json()) 
  .catch(this.handleError);  
}

private handleError(error:Response){
  if (error.status === 400){
     return Observable.throw(new BadRequest());
      }
      if (error.status === 404){
       return  observable.throw(new NotFound());
      }else
    return  Observable.throw(new AppError(error)); }

    //fileuploading
  
    pushFileToStorage(file: File): Observable<HttpEvent<{}>> {

      const headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization':'Bearer'+ this.authenticationservice.getToken()
     });
      const options = new RequestOptions({ headers: headers });
 
      let formdata: FormData = new FormData();
  
      formdata.append('file', file);
  
      const req = new HttpRequest('POST', '/api/post', formdata, {
        reportProgress: true,
        
        responseType: 'text'
      } );
  
      return this.httpclient.request(req);
    }
  

}
