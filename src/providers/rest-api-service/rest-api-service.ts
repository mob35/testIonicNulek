import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../app/app.constants';
import 'rxjs/add/operator/timeout';

/*
  Generated class for the RestApiService.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestApiService {

  constructor(
    public http: HttpClient
  ) {
    // console.log('Hello RestApiService');
  }

  private authorizationHeader() {
    const token = window.localStorage.getItem(Constants.URL + '@token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }

  get(url: string) {
    return this.http.get(url, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  post(url: string, Body: any) {
    return this.http.post(url, Body, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  put(url: string, Body: any) {
    return this.http.put(url, Body, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  delete(url: string) {
    return this.http.delete(url, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  signUp(api: string, Body: any): Promise<any> {
    return this.http.post(Constants.URL + api, Body, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  // Initail // # start

  signIn(api: string, Body: any): Promise<any> {
    return this.http.post(Constants.URL + api, Body, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  getUserProfile(api: string): Promise<any> {
    return this.http.get(Constants.URL + api, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  // Initail // # end

  // Playlist // # start

  postPlaylist(api: string, Body: any): Promise<any> {
    return this.http.post(Constants.URL + api, Body, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  getPlaylist(api: string, Id: string): Promise<any> {
    return this.http.get(Constants.URL + api + Id, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  deletePlaylist(api: string, Id: string): Promise<any> {
    return this.http.delete(Constants.URL + api + Id, { headers: this.authorizationHeader() })
      .timeout(30000)
      .toPromise();
  }

  // Playlist // # end
}
