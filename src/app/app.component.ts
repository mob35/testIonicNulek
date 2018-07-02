import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Constants } from './app.constants';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  activePage: string;
  rootPage: any = 'PlaylistPage';

  @ViewChild(Nav) nav;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private oneSignal: OneSignal
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (platform.is('cordova')) {
        this.onSignalSetup();
      }
    });
    let user = window.localStorage.getItem(Constants.URL + '@user');
    let token = window.localStorage.getItem(Constants.URL + '@token');

    if (user || token) {
      this.rootPage = 'PlaylistPage';
    } else {
      this.rootPage = 'InitialPage';
    }
  }
  goTo(page) {
    this.nav.setRoot(page);
    this.activePage = page;
  }
  logOut() {
    window.localStorage.removeItem(Constants.URL + '@token');
    window.localStorage.removeItem(Constants.URL + '@user');
    this.nav.setRoot('InitialPage');
  }
  onSignalSetup() {
    this.oneSignal.startInit('1f0d3f46-0467-427b-bb77-e2cc57b3e459', '702081438455');

    // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((onReceived) => {
      // do something when notification is received
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }
}

