import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the ApresentacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apresentacao',
  templateUrl: 'apresentacao.html',
})
export class ApresentacaoPage {

  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/img/ica-slidebox-img-1.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/img/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/img/ica-slidebox-img-3.png",
    }
  ];

  constructor(public navCtrl: NavController,
    private usersProvider: UsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApresentacaoPage');
  }

  ionViewWillEnter() {
    console.log('getViews', this.navCtrl.getViews());
    this.usersProvider.loadSession().then(() => {
      if (this.usersProvider.estaLogado()) {
        this.usersProvider.getUsuarioStorage().then((usuario: Usuario) => {
          console.log("usuario.perfil", usuario ? usuario.perfil : 'usuario undefined');
          if (usuario) {
            if (usuario.perfil || usuario.perfil===0) {
              this.navCtrl.setRoot("UserTabsPage");
              this.navCtrl.popToRoot();
            } else {
              this.navCtrl.push("HomePage");
            }
          }
        });
      }
    });
  }

  public continuar(): void {
    this.navCtrl.push("LoginPage");
  }

}
