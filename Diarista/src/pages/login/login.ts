import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Utils } from '../../utils';
import { Usuario } from '../../models/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  showLogin:boolean = true;
  model: User;

  constructor(public navCtrl: NavController,
              private util:Utils,
              private usersProvider: UsersProvider) {
    this.model = new User();
    this.model.email = '';
    this.model.password = '';
    this.model.nome = '';
  }

  ionViewDidLoad() {}

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

  doLogin() {
    this.showLogin = true;
  }

  doRegister() {
    this.showLogin = false;
  }

  login() {
    this.util.showLoading('Realizando Login...');

    this.usersProvider.login(this.model.email, this.model.password)
      .then(() => {
        this.util.dismissLoading();
        this.util.showToast('Login efetuado com sucesso.', 3000);        
        this.navCtrl.push("HomePage");

        this.usersProvider.storeUser(this.model.email);
      })
      .catch((error: any) => {
        let mensagem = error.status;
        if (error.status == 500) mensagem = 'Sistema indisponível.';
        if (error.status == 401) mensagem = 'Email ou Senha incorretos.';
        if (error.status == 432) mensagem = 'Erro inesperado.';
        console.log('login() erro: '+JSON.stringify(error));
        this.util.dismissLoading();
        this.util.showToast('Erro ao efetuar login: ' + mensagem,5000);
      });
  }

  register() {
    console.log('register()');
    this.util.showLoading('Realizando Cadastro...');

    this.usersProvider.register(this.model.email, this.model.password, this.model.nome)
      .then((result: any) => {
        this.util.dismissLoading();
        this.util.showToast('Usuário criado com sucesso.', 3000);
        this.doLogin();
      })
      .catch((error: any) => {
        console.log(JSON.stringify(error));
        this.util.dismissLoading();
        this.util.showToast('Erro ao criar o usuário. Erro: ' + error.message, 3000);
      });
  }
    
}

export class User {
  email: string;
  password: string;
  nome: string;
}
