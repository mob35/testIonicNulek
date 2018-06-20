import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Constants } from '../../app/app.constants';

/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlaylistServiceProvider {

    constructor(
        public http: HttpClient
    ) {
    }
    postPlaylist(playlist): Promise<any> {
        return this.http.post(Constants.URL + '/api/player', playlist)
            .timeout(55000)
            .toPromise()
            .then(response => response as any)
            .catch(this.handleError);
    }
    getPlaylist(): Promise<any> {
        return this.http.get(Constants.URL + '/api/player')
            .timeout(55000)
            .toPromise()
            .then(response => response as any)
            .catch(this.handleError);
    }

    deletePlaylist(id): Promise<any> {
        return this.http.delete(Constants.URL + '/api/player/' + id)
            .timeout(55000)
            .toPromise()
            .then(response => response as any)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}
