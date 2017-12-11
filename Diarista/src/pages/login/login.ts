import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  showLogin:boolean = true;
  model: User;

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public loadingCtrl:LoadingController,
              private usersProvider: UsersProvider) {
    this.model = new User();
    this.model.email = '';
    this.model.password = '';
    this.model.nome = '';
  }

  ionViewDidLoad() {  }

  doLogin() {
    this.showLogin = true;
  }

  doRegister() {
    this.showLogin = false;
  }

  login() {
    console.log('login()');
    let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loader.present();

    this.usersProvider.login(this.model.email, this.model.password)
      .then((result: any) => {
        console.log('login() sucesso: '+result);
        loader.dismiss();
        this.toastCtrl.create({ message: 'Usuário logado com sucesso. Token: ' + result, position: 'botton', duration: 3000 }).present();
        this.navCtrl.setRoot("HomePage");
      })
      .catch((error: any) => {
        console.log('login() erro: '+JSON.stringify(error));
        loader.dismiss();
        this.toastCtrl.create({ message: 'Erro ao efetuar login. Erro: ' + error.message, position: 'botton', duration: 3000 }).present();
      });
  }

  register() {
    console.log('register()');
    let loader = this.loadingCtrl.create({
      content: "Logging in..."
    });
    loader.present();

    this.usersProvider.register(this.model.email, this.model.password, this.model.nome)
      .then((result: any) => {
        loader.dismiss();
        this.toastCtrl.create({ message: 'Usuário criado com sucesso.', position: 'botton', duration: 3000 }).present();

        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        this.doLogin();
      })
      .catch((error: any) => {
        console.log(JSON.stringify(error));
        loader.dismiss();
        this.toastCtrl.create({ message: 'Erro ao criar o usuário. Erro: ' + error.message, position: 'botton', duration: 3000 }).present();
      });
  }
}

export class User {
  email: string;
  password: string;
  nome: string;
}
