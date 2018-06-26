import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Constants } from '../../app/app.constants';
import { CoreserviceProvider } from '../../providers/coreservice/coreservice';

/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InitialServiceProvider {

    constructor(
        public http: HttpClient,
        public coreService: CoreserviceProvider
    ) {
    }
    signIn(credentials): Promise<any> {
        let headers = this.coreService.authorizationHeader();
        return this.http.post(Constants.URL + '/api/auth/signin', credentials, { headers: headers })
            .timeout(55000)
            .toPromise()
            .then((response: any) => {
                let res = response;
                window.localStorage.setItem(Constants.URL + '@token', res.token);
                return response;
            })
            .catch(this.handleError);
    }

    signUp(credentials): Promise<any> {
        let headers = this.coreService.authorizationHeader();
        return this.http.post(Constants.URL + '/api/auth/signup', credentials, { headers: headers })
            .timeout(55000)
            .toPromise()
            .then((response: any) => {
                let res = response;
                window.localStorage.setItem(Constants.URL + '@token', res.token);
                return response;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        // return Promise.reject(error.message || error);
        return Promise.reject(error.error || error.message || error);
    }

}
