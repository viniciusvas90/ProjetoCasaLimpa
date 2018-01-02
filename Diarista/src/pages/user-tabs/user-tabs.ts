import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { UsersProvider } from "../../providers/users/users";
import { Usuario } from "../../models/usuario";
import { ClientesProvider } from '../../providers/clientes/clientes';
import { DiaristasProvider } from '../../providers/diaristas/diaristas';
import { UtilsProvider } from '../../providers/utils/utils';
import { Cliente } from '../../models/cliente';
import { Diarista } from '../../models/diarista';

export interface TabInterface {
  root: string;
  tabTitle: string;
  tabIcon: string;
}

@IonicPage()
@Component({
  selector: 'page-user-tabs',
  templateUrl: 'user-tabs.html',
})
export class UserTabsPage {
  tabsList: TabInterface[];
  @ViewChild('myTabs') myTabs: Tabs;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private usersProvider: UsersProvider,
    private clientesProvider: ClientesProvider,
    private diaristasProvider: DiaristasProvider,
    private utils: UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabsPage');
    if (this.usersProvider.estaLogado()) {
      this.usersProvider.getUsuarioStorage().then((usuario: Usuario) => {
        switch (usuario.perfil) {
          case 0:
            this.tabsList = [
              { root: 'AdminHomePage', tabTitle: 'Home', tabIcon: 'home' },
              { root: 'AdminUserVerificationPage', tabTitle: 'Verificação de Usuários', tabIcon: 'information-circle' }
            ];
            break;

          case 1:
            this.carregarCliente(usuario.id);
            this.tabsList = [
              { root: 'ClientesHomePage', tabTitle: 'Home', tabIcon: 'home' },
              { root: 'ClienteInfoPage', tabTitle: 'Meus Dados', tabIcon: 'information-circle' },
              { root: 'ClienteConfigPage', tabTitle: 'Configuração', tabIcon: 'information-circle' }
            ];
            break;

          case 2:
            this.carregarDiarista(usuario.id);
            this.tabsList = [
              { root: 'DiaristasHomePage', tabTitle: 'Home', tabIcon: 'home' },
              { root: 'DiaristaInfoPage', tabTitle: 'Meus Dados', tabIcon: 'information-circle' },
              { root: 'DiaristaConfigPage', tabTitle: 'Configuração', tabIcon: 'information-circle' }
            ];
            break;
        }
      });
    }
  }

  carregarCliente(idUsuario: number): void {
    this.utils.showLoading("Carregando...");
    this.clientesProvider.loadClienteStorage().then((cliente: Cliente) => {
      if (cliente) {
        this.utils.dismissLoading();
      } else {
        this.clientesProvider.storeCliente(idUsuario).then(() => {
          this.utils.dismissLoading();
        });
      }
    });
  }

  carregarDiarista(idUsuario: number): void {
    this.utils.showLoading("Carregando...");
    this.diaristasProvider.loadDiaristaStorage().then((diarista: Diarista) => {
      if (diarista) {
        this.utils.dismissLoading();
      } else {
        this.diaristasProvider.storeDiarista(idUsuario).then(() => {
          this.utils.dismissLoading();
        });
      }
    });
  }

}
