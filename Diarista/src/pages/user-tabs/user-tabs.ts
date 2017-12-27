import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { UsersProvider } from "../../providers/users/users";
import { Usuario } from "../../models/usuario";

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
    private usersProvider: UsersProvider) {
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
            this.tabsList = [
              { root: 'ClientesHomePage', tabTitle: 'Home', tabIcon: 'home' },
              { root: 'ClienteInfoPage', tabTitle: 'Meus Dados', tabIcon: 'information-circle' },
              { root: 'ClienteConfigPage', tabTitle: 'Configuração', tabIcon: 'information-circle' }
            ];
            break;

          case 2:
            this.tabsList = [
              { root: 'DiaristasHomePage', tabTitle: 'Home', tabIcon: 'home' },
              { root: 'DiaristaInfoPage', tabTitle: 'Meus Dados', tabIcon: 'information-circle' },
              { root: 'DiaristaConfigPage', tabTitle: 'Configuração', tabIcon: 'information-circle' }
            ];
            break;
        }
        console.log('myTabs', this.myTabs);
        this.myTabs.select(0);
        console.log('myTabs.getSelected', this.myTabs.getSelected());
      });
    }
  }

}
