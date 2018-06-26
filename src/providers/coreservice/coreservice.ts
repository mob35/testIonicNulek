import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../app/app.constants';
/*
  Generated class for the CoreserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CoreserviceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CoreserviceProvider Provider');
  }

  authorizationHeader() {
    // let token = JSON.parse(window.localStorage.getItem(Constants.URL + '@token'));    
    let token = window.localStorage.getItem(Constants.URL + '@token');
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    // headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

  getUserProfile(): Promise<any> {
    let headers = this.authorizationHeader();
    return this.http.get(Constants.URL + '/api/getuser', { headers: headers })
      .toPromise()
      .then((response: any) => {
        let res = response;
        window.localStorage.setItem(Constants.URL + '@user', JSON.stringify(res.data));
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.error || error.message || error);
  }

}
