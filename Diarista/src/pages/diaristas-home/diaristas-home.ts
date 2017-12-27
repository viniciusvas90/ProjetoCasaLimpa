import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-diaristas-home',
  templateUrl: 'diaristas-home.html',
})
export class DiaristasHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiaristasHomePage');
  }

}
