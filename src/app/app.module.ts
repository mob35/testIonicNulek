import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { PlaylistServiceProvider } from '../pages/playlist/playlist.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Device } from '@ionic-native/device';
import { InitialServiceProvider } from '../pages/initial/initial.service';
import { CoreserviceProvider } from '../providers/coreservice/coreservice';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CoreserviceProvider,
    PlaylistServiceProvider,
    SocialSharing,
    InitialServiceProvider,
    Device
  ]
})
export class AppModule { }
