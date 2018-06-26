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
export class PlaylistServiceProvider {

    constructor(
        public http: HttpClient,
        public coreService: CoreserviceProvider
    ) {
    }
    postPlaylist(playlist): Promise<any> {
        let headers = this.coreService.authorizationHeader();
        return this.http.post(Constants.URL + '/api/player', playlist, { headers: headers })
            .timeout(55000)
            .toPromise()
            .then(response => response as any)
            .catch(this.handleError);
    }
    getPlaylist(userId): Promise<any> {
        let headers = this.coreService.authorizationHeader();
        return this.http.get(Constants.URL + '/api/playerbyuser/' + userId, { headers: headers })
            .timeout(55000)
            .toPromise()
            .then(response => response as any)
            .catch(this.handleError);
    }

    deletePlaylist(id): Promise<any> {
        let headers = this.coreService.authorizationHeader();
        return this.http.delete(Constants.URL + '/api/player/' + id, { headers: headers })
            .timeout(55000)
            .toPromise()
            .then(response => response as any)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}
