import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { DiaristasProvider } from "../../providers/diaristas/diaristas";
import { Diarista } from "../../models/diarista";
import { ClientesProvider } from "../../providers/clientes/clientes";
import { Cliente } from "../../models/cliente";
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-admin-user-verification',
  templateUrl: 'admin-user-verification.html',
})
export class AdminUserVerificationPage {
  pageTitle: string = 'Verificação de Usuários';
  carregouDiaristas: boolean = false;
  carregouClientes: boolean = false;

  listaDiaristasPendentes: Array<Diarista>;
  listaClientesPendentes: Array<Cliente>;
  usuario: string = "diaristas";

  constructor(public navCtrl: NavController,
    private diaristasProvider: DiaristasProvider,
    private clientesProvider: ClientesProvider,
    private utils: UtilsProvider,
    public modalCtrl: ModalController) {
    this.listaDiaristasPendentes = new Array<Diarista>();
    this.listaClientesPendentes = new Array<Cliente>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserVerificationPage');
  }

  ionViewWillEnter() {
    this.getAllDiaristasPendant();
    this.getAllClientesPendant();
  }

  //listar diaristas com cadastro pendente
  getAllDiaristasPendant() {
    this.utils.showLoading('Carregando dados...');
    console.log('listar diaristas com cadastro pendente');
    this.diaristasProvider.getAllPendant()
      .then((result: Array<Diarista>) => {
        //console.log('sucesso retornado do provider: ' + JSON.stringify(result));
        this.listaDiaristasPendentes = result;
        this.utils.dismissLoading();
      })
      .catch((error: any) => {
        console.log('erro retornado do provider:' + JSON.stringify(error));
        this.utils.showToast('Erro ao listar Diaristas com cadastro pendente.', 3000);
        this.utils.dismissLoading();
      });
  }

  //listar clientes com cadastro pendente
  getAllClientesPendant() {
    this.utils.showLoading('Carregando dados...');
    console.log('listar diaristas com cadastro pendente');
    this.clientesProvider.getAllPendant()
      .then((result: Array<Cliente>) => {
        //console.log('sucesso retornado do provider: ' + JSON.stringify(result));
        this.listaClientesPendentes = result;
        this.utils.dismissLoading();
      })
      .catch((error: any) => {
        console.log('erro retornado do provider:' + JSON.stringify(error));
        this.utils.showToast('Erro ao listar Clientes com cadastro pendente.', 3000);
        this.utils.dismissLoading();
      });
  }

  private openDetails(obj: any, tipo: string) {
    let reload: boolean = false;
    let modal = this.modalCtrl.create('AdminUserVerificationDetailsPage', { object: obj, tipo: tipo });
    modal.onDidDismiss((resposta) => {  
      if (resposta === true) {
        if (tipo == 'd') {
          console.log('autorizando diarista');
          this.diaristasProvider.autorizar(obj).then(() => {
            reload = true;
          }).then(() => {
            reload = true;
          });
        }
        if (tipo == 'c') {
          console.log('autorizando cliente');
        }
      } else if (resposta === false) {
        if (tipo == 'd') {
          console.log('negando diarista');
        }
        if (tipo == 'c') {
          console.log('negando cliente');
        }
      } else {
        reload = true;
      }
      //while (!reload) { }
      this.getAllDiaristasPendant();
      this.getAllClientesPendant();
    });
    modal.present();
  }

}
