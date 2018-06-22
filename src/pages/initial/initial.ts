import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { InitialServiceProvider } from './initial.service';

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private device: Device,
    private initialServiceProvider: InitialServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialPage');
  }
  initialGuest() {
    this.user.serial = this.device.serial ? this.device.serial : '1805';
    this.initialServiceProvider.signUp(this.user).then(data => {
      this.navCtrl.setRoot('PlaylistPage');
    }, err => {
      if (err && err.status === 400 && err.message === "Email already exists") {
        this.initialServiceProvider.signIn(this.user).then(data => {
          this.navCtrl.setRoot('PlaylistPage');
        }, err => {
          console.log(err);
        });
      }
    });
  }
}
