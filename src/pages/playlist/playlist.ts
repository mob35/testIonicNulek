import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Constants } from '../../app/app.constants';
import { RestApiService } from '../../providers/rest-api-service/rest-api-service';


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
    private sanitizer: DomSanitizer,
    private restApiService: RestApiService,
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
      let loading = this.loadingCtrl.create();
      loading.present();
      this.index = i;
      this.playerid = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id + '?autoplay=1');
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    } else {
      if (this.index === i) {
        this.openPlayer = false;
      } else {
        this.openPlayer = true;
        let loading = this.loadingCtrl.create();
        loading.present();
        this.index = i;
        this.playerid = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id + '?autoplay=1');
        setTimeout(() => {
          loading.dismiss();
        }, 1000);
      }
    }
  }

  async getPlaylist() {
    let loading = this.loadingCtrl.create();
    loading.present();
    try {
      let data: any = await this.restApiService.getPlaylist('/api/playerbyuser/', this.user._id);
      this.playlists = data.data;
      if (!this.playlists || this.playlists.length <= 0) {
        this.goToAddPlaylist();
      }
      loading.dismiss();
    } catch (err) {
      loading.dismiss();
      alert('Error' + err);
    }
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
            this.restApiService.postPlaylist('/api/player', data).then(data => {
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

  async delete(id) {
    console.log(id);
    let loading = this.loadingCtrl.create();
    try {
      loading.present();
      let data = await this.restApiService.deletePlaylist('/api/player/', id)
      if (data != undefined) {
        console.log('Delete Success');
        loading.dismiss();
        this.ionViewDidLoad();
      }
    } catch (err) {
      loading.dismiss();
      alert('Error' + err);
    }
  }

  share(item) {
    let loading = this.loadingCtrl.create();
    loading.present();
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
      loading.dismiss();
    }, (err) => {
      console.log("Sharing failed with message: ", err);
      loading.dismiss();
    });
  }
}
