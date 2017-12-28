import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Diarista } from "../../models/diarista";
import { Cliente } from "../../models/cliente";

@IonicPage()
@Component({
  selector: 'page-admin-user-verification-details',
  templateUrl: 'admin-user-verification-details.html',
})
export class AdminUserVerificationDetailsPage {

  diarista: Diarista;
  cliente: Cliente;
  teste: String = 'teste';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.diarista = new Diarista();
    this.cliente = new Cliente();

    if (navParams.get('tipo')=='d') {
      this.diarista = navParams.get('object');
    } else if (navParams.get('tipo') == 'c') {
      this.cliente = navParams.get('object');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserVerificationDetailsPage');
  }

}
