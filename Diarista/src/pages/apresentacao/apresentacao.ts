import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UsersProvider, Usuario } from '../../providers/users/users';

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
    this.usersProvider.loadSession().then(() => {
      if (this.usersProvider.estaLogado()) {
        this.usersProvider.getUsuarioStorage().then((usuario: Usuario) => {
          console.log("usuario.perfil",usuario.perfil);
          switch (usuario.perfil) {
            case 0:
              this.navCtrl.push("AdminHomePage");
              break;
            case 1:
              this.navCtrl.push("ClientesHomePage");
              break;
            case 2:
              this.navCtrl.push("DiaristasHomePage");
              break;
            default:
              this.navCtrl.push("HomePage");
          }
        });
      }
    });    
  }

  public continuar(): void{
    this.navCtrl.push("LoginPage");
  }

}
