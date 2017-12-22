import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Imovel } from "../../models/imovel";
import { Endereco } from "../../models/endereco";

/**
 * Generated class for the ClientesCadastroImoveisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clientes-imoveis-cadastro',
  templateUrl: 'clientes-imoveis-cadastro.html',
})
export class ClientesImoveisCadastroPage {

  imovel: Imovel;
  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder) {
    this.imovel = new Imovel();
    this.imovel.temAnimais = false;
    this.imovel.temCriancas = false;
    this.imovel.endereco = new Endereco();

    this.formGroup = formBuilder.group({
      descricao: ['', Validators.required],
      tipo: ['', Validators.required],
      qtdComodos: ['', Validators.required],
      metrosQuadrados: ['', Validators.required],
      temAnimais: ['', Validators.required],
      animais: ['', Validators.required],
      temCriancas: ['', Validators.required],
      qtdCriancas: ['', Validators.required],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientesImoveisCadastroPage');
  }

}
