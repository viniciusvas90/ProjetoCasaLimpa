import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-diaristas-home',
  templateUrl: 'diaristas-home.html',
})
export class DiaristasHomePage {
  pageTitle: string = 'Diarista';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiaristasHomePage');
  }

}
