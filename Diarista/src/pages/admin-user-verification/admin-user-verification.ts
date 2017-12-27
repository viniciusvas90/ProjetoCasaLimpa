import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DiaristasProvider } from "../../providers/diaristas/diaristas";
import { Diarista } from "../../models/diarista";
import { ClientesProvider } from "../../providers/clientes/clientes";
import { Cliente } from "../../models/cliente";
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the AdminUserVerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-user-verification',
  templateUrl: 'admin-user-verification.html',
})
export class AdminUserVerificationPage {

  listaDiaristasPendentes: Array<Diarista>;
  listaClientesPendentes: Array<Cliente>;
  usuario: string = "diaristas";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private diaristasProvider: DiaristasProvider,
    private clientesProvider: ClientesProvider,
    private utils: UtilsProvider) {
    this.listaDiaristasPendentes = new Array<Diarista>();
    this.listaClientesPendentes = new Array<Cliente>();

    this.listaDiaristasPendentes.push(new Diarista());
    this.listaDiaristasPendentes.push(new Diarista());
    this.listaDiaristasPendentes.push(new Diarista());

    this.listaClientesPendentes.push(new Cliente());
    this.listaClientesPendentes.push(new Cliente());

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserVerificationPage');
  }

  //listar diaristas com cadastro pendente
  getAllDiaristasPendant() {
    console.log('listar diaristas com cadastro pendente');
    this.diaristasProvider.getAllPendant()
      .then((result: Array<Diarista>) => {
        console.log('sucesso retornado do provider: ' + JSON.stringify(result));
        this.listaDiaristasPendentes = result;
      })
      .catch((error: any) => {
        console.log('erro retornado do provider:' + JSON.stringify(error));
        this.utils.showToast('Erro ao listar Diaristas com cadastro pendente.', 3000);
      });
  }

  //listar clientes com cadastro pendente
  getAllClientesPendant() {
    console.log('listar diaristas com cadastro pendente');
    this.clientesProvider.getAllPendant()
      .then((result: Array<Cliente>) => {
        console.log('sucesso retornado do provider: ' + JSON.stringify(result));
        this.listaClientesPendentes = result;
      })
      .catch((error: any) => {
        console.log('erro retornado do provider:' + JSON.stringify(error));
        this.utils.showToast('Erro ao listar Clientes com cadastro pendente.', 3000);
      });
  }

}
