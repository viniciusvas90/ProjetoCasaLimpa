import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersProvider } from '../providers/users/users';
import { LoginPage } from '../pages/login/login';
import { Usuario } from "../models/usuario";

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage;
  @ViewChild(Nav) nav: NavController;

  pages: PageInterface[];

  tab1Root: any;
  tab2Root: any;

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
          this.pages = [
            { title: 'Home', pageName: 'AdminHomePage', tabComponent: 'TabAdminHomePage', index: 0, icon: 'home' },
            { title: 'Configurações', pageName: 'AdminConfigPage', tabComponent: 'TabAdminConfigPage', index: 1, icon: 'contacts' },
            { title: 'Meus Dados', pageName: 'AdminInfoPage', tabComponent: 'TabAdminInfoPage', index: 2, icon: 'shuffle' },
          ];

          this.tab1Root = 'ClientesHomePage';
          this.tab2Root = 'ClienteInfoPage';
          break;

        case 1:
          this.pages = [
            { title: 'Home', pageName: 'ClientesHomePage', tabComponent: 'TabClientesHomePage', index: 0, icon: 'home' },
            { title: 'Configurações', pageName: 'ClienteConfigPage', tabComponent: 'TabClienteConfigPage', index: 1, icon: 'contacts' },
            { title: 'Meus Dados', pageName: 'ClienteInfoPage', tabComponent: 'TabClienteInfoPage', index: 2, icon: 'shuffle' },
          ];

          this.tab1Root = 'ClientesHomePage';
          this.tab2Root = 'ClienteInfoPage';
          break;

        case 2:
          this.pages = [
            { title: 'Home', pageName: 'DiaristasHomePage', tabComponent: 'TabDiaristasHomePage', index: 0, icon: 'home' },
            { title: 'Configurações', pageName: 'DiaristaConfigPage', tabComponent: 'TabDiaristaConfigPage', index: 1, icon: 'contacts' },
            { title: 'Meus Dados', pageName: 'DiaristaInfoPage', tabComponent: 'TabDiaristaInfoPage', index: 2, icon: 'shuffle' },
          ];

          this.tab1Root = 'DiaristasHomePage';
          this.tab2Root = 'DiaristaInfoPage';
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

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNavs() && page.index != undefined) {
      alert(1);
      this.nav.getActiveChildNav().select(page.index);
    } else {
      alert(2);
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'secondary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'secondary';
    }
    return;
  }
}
