import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersProvider } from '../providers/users/users';
import { LoginPage } from '../pages/login/login';
import { Usuario } from "../models/usuario";

export interface TabInterface {
  root: string;
  tabTitle: string;
  tabIcon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage;
  @ViewChild(Nav) nav: NavController;

  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  tab5: any;
  tabsList: TabInterface[];

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    private usersProvider: UsersProvider) {
    platform.ready().then(() => {
      console.log("Carregou app.");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.constroiMenu();
      this.rootPage = "ApresentacaoPage";
    });
  }

  private constroiMenu(): void {
    this.usersProvider.getUsuarioStorage().then((usuario: Usuario) => {
      console.log('perfil', usuario.perfil);
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
    });
  }

  showMenu() {
    return this.usersProvider.estaLogado();
  }

  logout(): void {
    this.usersProvider.logout();
    this.nav.push(LoginPage);
  }
}
