import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { PlaylistServiceProvider } from '../playlist/playlist.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Constants } from '../../app/app.constants';


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
  user: any = {};
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
    this.user = window.localStorage.getItem(Constants.URL + '@user') ? JSON.parse(window.localStorage.getItem(Constants.URL + '@user')) : null;
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
    this.playlistServiceProvider.getPlaylist(this.user._id).then(data => {
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

    let load = this.loadingCtrl.create();
    load.present();
    let options = {
      // message: 'share this', // not supported on some apps (Facebook, Instagram)
      // subject: 'the subject', // fi. for email
      // files: ['', ''], // an array of filenames either locally or remotely
      url: item.player,
      chooserTitle: 'Sharing' // Android only, you can override the default share sheet title
    }
    this.socialSharing.shareWithOptions(options).then((result) => {
      console.log("Share completed? ", result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: ", result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      load.dismiss();
    }, (err) => {
      console.log("Sharing failed with message: ", err);
      load.dismiss();
    });
  }
}
