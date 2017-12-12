import { Component, ViewChild  } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  @ViewChild('menu') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      console.log("carregou");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //se não possui cadastro
      this.rootPage = "LoginPage";
      if (1!=1) {
        this.nav.push("HomePage");
      }
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
}
