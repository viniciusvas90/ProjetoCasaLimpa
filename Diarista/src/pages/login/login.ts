import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Util } from '../../util/util';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  showLogin:boolean = true;
  model: User;

  constructor(public navCtrl: NavController,
              public loadingCtrl:LoadingController,
              private util:Util,
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
        let token = JSON.stringify(result.headers).split(':')[7].split('"')[1];
        localStorage.setItem('token', token);
        console.log('login() sucesso: '+token);
        loader.dismiss();
        this.util.showToast('Login efetuado com sucesso.', 3000);
        this.navCtrl.setRoot("HomePage");
      })
      .catch((error: any) => {
        let mensagem = error.status;
        if (error.status == 500) mensagem = 'Sistema indisponível.';
        if (error.status == 401) mensagem = 'Email ou Senha incorretos.';
        console.log('login() erro: '+JSON.stringify(error));
        loader.dismiss();
        this.util.showToast('Erro ao efetuar login: ' + mensagem,5000);
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
