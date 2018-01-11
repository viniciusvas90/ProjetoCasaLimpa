import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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
  pageTitle: String = 'Detalhes do Usuário';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    if (navParams.get('tipo') == 'd') {
      this.diarista = navParams.get('object');
    } else if (navParams.get('tipo') == 'c') {
      this.cliente = navParams.get('object');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserVerificationDetailsPage');
  }

  fechar(): void {
    this.viewCtrl.dismiss();
  }

  autorizar(): void {
    this.viewCtrl.dismiss(true);
  }

  negar(): void {
    this.viewCtrl.dismiss(false);
  }

}
