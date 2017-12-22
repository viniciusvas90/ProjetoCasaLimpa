import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Utils } from '../../utils';
import { Usuario } from '../../models/usuario';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  showLogin: boolean = true;
  model: User = new User();

  formGroupLogin: FormGroup;
  formGroupRegister: FormGroup;
  emailLogin: AbstractControl;
  passwordLogin: AbstractControl;

  constructor(public navCtrl: NavController,
    private util: Utils,
    private usersProvider: UsersProvider,
    private formBuilder: FormBuilder) {
    this.model.email = '';
    this.model.email2 = '';
    this.model.password = '';
    this.model.password2 = '';
    this.model.nome = '';

    this.formGroupLogin = formBuilder.group({
      emailLogin: ['', Validators.required],
      passwordLogin: ['', Validators.required]
    });

    this.formGroupRegister = formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      email2: ['', Validators.required],
      password2: ['', Validators.required]
    });

    this.emailLogin = this.formGroupLogin.controls['emailLogin'];
    this.passwordLogin = this.formGroupLogin.controls['passwordLogin'];
  }

  ionViewDidLoad() { }

  ionViewWillEnter() {
    this.usersProvider.loadSession().then(() => {
      if (this.usersProvider.estaLogado()) {
        this.usersProvider.getUsuarioStorage().then((usuario: Usuario) => {
          console.log("usuario.perfil", usuario.perfil);
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
        console.log('login() erro: ' + JSON.stringify(error));
        this.util.dismissLoading();
        this.util.showToast('Erro ao efetuar login: ' + mensagem, 5000);
      });
  }

  register() {
    console.log('register()');

    if (this.model.email !== this.model.email2) {
      this.util.showToast('Os emails informados não conferem', 3000);
      return;
    }

    if (this.model.password !== this.model.password2) {
      this.util.showToast('As senhas informadas não conferem', 3000);
      return;
    }

    this.util.showLoading('Realizando Cadastro...');

    this.usersProvider.register(this.model.email, this.model.password, this.model.nome)
      .then((result: any) => {
        this.util.dismissLoading();
        this.util.showToast('Usuário criado com sucesso.', 3000);
        this.doLogin();
      })
      .catch((error: any) => {
        let mensagem = error.status;
        if (error.status == 500) mensagem = 'Sistema indisponível.';
        if (error.status == 401) mensagem = 'Email ou Senha incorretos.';
        if (error.status == 432) mensagem = 'Erro inesperado.';
        console.log('register() erro: ' + JSON.stringify(error));
        this.util.dismissLoading();
        this.util.showToast('Erro ao criar o usuário. Erro: ' + mensagem, 5000);
      });
  }

}

export class User {
  email: string;
  password: string;
  email2: string;
  password2: string;
  nome: string;
}
