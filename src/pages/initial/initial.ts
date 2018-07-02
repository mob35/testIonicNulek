import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { RestApiService } from '../../providers/rest-api-service/rest-api-service';
import { Constants } from '../../app/app.constants';

/**
 * Generated class for the InitialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {
  user: any = {};
  Pin: String = "";
  ShowPin: Boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private device: Device,
    private modalCtrl: ModalController,
    private restApiService: RestApiService,
    private loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialPage');
  }
  eventCapture(event) {
    this.ShowPin = false;
    this.Pin = event;
  }
  showModalPin() {
    let modal = this.modalCtrl.create('PinPage', null, { enableBackdropDismiss: false });
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data);
      }
    });
    modal.present();
  }

  // showPin() {
  //   this.ShowPin = !this.ShowPin;
  // }

  async initialGuest() {
    this.user.serial = this.device.serial ? this.device.serial : '1805';
    this.user.username = this.user.serial;
    let loading = this.loadingCtrl.create();
    try {
      loading.present();
      let signup: any = await this.restApiService.signUp('/api/auth/signup', this.user);
      if (signup) {
        window.localStorage.setItem(Constants.URL + '@token', signup.token);
        try {
          let getuser: any = await this.restApiService.getUserProfile('/api/getuser');
          window.localStorage.setItem(Constants.URL + '@user', JSON.stringify(getuser.data));
          loading.dismiss();
          this.navCtrl.setRoot('PlaylistPage');
        } catch (err) {
          console.log(err.error);
          loading.dismiss();
        }
      }
    } catch (err) {
      if (err && err.error.status === 400 && (err.error.message === "Email already exists" || err.error.message === "Username already exists")) {
        try {
          let signin: any = await this.restApiService.signIn('/api/auth/signin', this.user);
          if (signin) {
            window.localStorage.setItem(Constants.URL + '@token', signin.token);
            try {
              let getuser: any = await this.restApiService.getUserProfile('/api/getuser');
              window.localStorage.setItem(Constants.URL + '@user', JSON.stringify(getuser.data));
              loading.dismiss();
              this.navCtrl.setRoot('PlaylistPage');
            } catch (err) {
              console.log(err.error);
              loading.dismiss();
            }
          }
        } catch (err) {
          console.log(err.error);
          loading.dismiss();
        }
      }
    };
  }

}
