import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { InitialServiceProvider } from './initial.service';
import { CoreserviceProvider } from '../../providers/coreservice/coreservice';

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
    private initialServiceProvider: InitialServiceProvider,
    private coreserviceProvider: CoreserviceProvider,
    private modalCtrl: ModalController
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

  }

  showPin() {
    this.ShowPin = !this.ShowPin;
  }

  initialGuest() {
    this.user.serial = this.device.serial ? this.device.serial : '1805';
    this.user.username = this.user.serial;
    this.initialServiceProvider.signUp(this.user).then(data => {
      this.coreserviceProvider.getUserProfile().then(data => {
        this.navCtrl.setRoot('PlaylistPage');
      }, err => {
        alert(err.message);
      });
    }, err => {
      // alert(err.message);
      if (err && err.status === 400 && (err.message === "Email already exists" || err.message === "Username already exists")) {
        this.initialServiceProvider.signIn(this.user).then(data => {
          this.coreserviceProvider.getUserProfile().then(data => {
            this.navCtrl.setRoot('PlaylistPage');
          }, err => {
            alert(err.message);
          });
        }, err => {
          alert(err.message);
        });
      }
    });
  }

}
