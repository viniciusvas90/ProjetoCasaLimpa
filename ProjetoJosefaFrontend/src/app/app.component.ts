import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsersProvider } from '../providers/users/users';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage;
  @ViewChild(Nav) nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private usersProvider: UsersProvider,
    public events: Events
  ) {
    platform.ready().then(() => {
      console.log("Carregou app.");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.rootPage = "ApresentacaoPage";
      events.subscribe('user:logout', () => {
        this.logout();
      });
    });
  }

  logout(): void {
    this.usersProvider.logout();
    this.nav.setRoot("LoginPage");
    this.nav.popToRoot();
  }
}
