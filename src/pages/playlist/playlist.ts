import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { PlaylistServiceProvider } from '../playlist/playlist.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the PlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {
  playlists: any = [];
  playerid: any;
  index: any = 0;
  openPlayer: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    // private modalCtrl: ModalController,
    private socialSharing: SocialSharing,
    private playlistServiceProvider: PlaylistServiceProvider,
    private sanitizer: DomSanitizer,
    private loadingCtrl: LoadingController

  ) {
  }

  ionViewDidLoad() {
    this.openPlayer = false;
    this.getPlaylist();
  }
  onYoutube(i, id) {
    if (this.openPlayer === false) {
      this.openPlayer = true;
      let load = this.loadingCtrl.create();
      load.present();
      this.index = i;
      this.playerid = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id + '?autoplay=1');
      setTimeout(() => {
        load.dismiss();
      }, 1000);
    } else {
      if (this.index === i) {
        this.openPlayer = false;
      } else {
        this.openPlayer = true;
        let load = this.loadingCtrl.create();
        load.present();
        this.index = i;
        this.playerid = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id + '?autoplay=1');
        setTimeout(() => {
          load.dismiss();
        }, 1000);
      }
    }
  }

  getPlaylist() {
    let load = this.loadingCtrl.create();
    load.present();
    this.playlistServiceProvider.getPlaylist().then(data => {
      this.playlists = data.data;

      if (!this.playlists || this.playlists.length <= 0) {
        this.goToAddPlaylist();
      }
      load.dismiss();
    }, err => {
      load.dismiss();
      alert('Error' + err);
    });
  }

  goToAddPlaylist() {
    let prompt = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Add Playlist',
      // message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'player',
          placeholder: 'Ex. https://www.youtube.com/XXX'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'danger',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.playlistServiceProvider.postPlaylist(data).then(data => {
              this.ionViewDidLoad();
            }, err => {
              alert('Error' + err);
            });
          }
        }
      ]
    });
    prompt.present();
  }

  delete(id) {
    let load = this.loadingCtrl.create();
    load.present();
    this.playlistServiceProvider.deletePlaylist(id).then(data => {
      if (data != undefined) {
        console.log('Delete Success');
        load.dismiss();
        this.ionViewDidLoad();
      }
    }, err => {
      load.dismiss();
      alert('Error' + err);
    });
  }

  share(item) {
    console.log(item);
    // this.socialSharing.share('รายงานรอบการขาย ' + this.historyData.shop.name, null, dataUrl).then(() => {
      // this.loading.dismiss();
    // }).catch((error) => {
      // this.loading.dismiss();
    // });
  }
}
