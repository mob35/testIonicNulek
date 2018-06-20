import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any = [{
    name: 'หนูเล็ก1',
    tel: '08944444'
  },{
    name: 'หนูเล็ก2',
    tel: '08944444'
  },{
    name: 'หนูเล็ก3',
    tel: '08944444'
  }];
  
  constructor(public navCtrl: NavController) {
    console.log(this.users);
  }

}
