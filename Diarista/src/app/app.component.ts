import { Component, ViewChild  } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersProvider, Usuario } from '../providers/users/users';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  @ViewChild('menu') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              private usersProvider: UsersProvider) {
    platform.ready().then(() => {
      console.log("Carregou.");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.rootPage = "LoginPage";
    });
  }

  openPage(option) {
    console.log(option);
    if (option == 'cliente') this.nav.push("ClientesPage");
    if (option == 'diarista') this.nav.push("CadastroDiaristasPage");
    if (option == 'home') this.nav.push("HomePage");
  }

  showMenu() {
    //return this.auth.isAuthenticated() || this.platform.is('core');
    return true;
  }

  logout() : void {
    this.usersProvider.logout();
    this.nav.push(LoginPage);
  }
}
