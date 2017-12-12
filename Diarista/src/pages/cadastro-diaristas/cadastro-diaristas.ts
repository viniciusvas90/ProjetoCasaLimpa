import { Component } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { DiaristasProvider, Diarista } from '../../providers/diaristas/diaristas';
import { Utils } from '../../Utils';
import 'rxjs/add/operator/catch';

/**
 * Generated class for the DiaristasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-diaristas',
  templateUrl: 'cadastro-diaristas.html',
})
export class CadastroDiaristasPage {
  diaristaResponse: Diarista;
  public base64Image: string;
  diarista = {
    nome: "", cpf: "", email: "", telefone: "",
    endereco: {
      bairro: "", numero : "", cep: "", endereco: ""
    },
    recomendacoes: []
  };
  listRecomendacoes = [];
  passo = 1;
  recomendacao = { nome: "", contato: ""};
  public unregisterBackButtonAction: any;

  options = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
  }

  constructor(private utils: Utils,
              private camera: Camera,
              public platform: Platform,
              private diaristasProvider: DiaristasProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroDiaristasPage');
    this.initializeBackButtonCustomHandler();
    this.list();
  }

  ionViewWillLeave() {
      // Unregister the custom back button action for this page
      this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  public initializeBackButtonCustomHandler(): void {
      this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
          this.voltar();
      }, 10);
  }

  private avancar() : void { this.passo++; }

  private voltar() : void {
    if (this.passo > 1) this.passo--;
  }

  list() {
    /*this.dao.getList((lista) => {
      this.listRecomendacoes = lista;
    });*/
  }

  addRecomendacao() {
    if (this.recomendacao.nome.trim() == '') {
      alert('Informe o nome');
      return;
    }
    if (this.recomendacao.contato.trim() == '') {
      alert('Informe o telefone');
      return;
    }
    var item = this.recomendacao;
    this.recomendacao = { nome: "", contato: ""};
    this.listRecomendacoes.push(item);
  }

  edit(recomendacao) {
      /*if (data) {
        this.dao.update(data, (recomendacao) => {
          let toast = this.utils',on: 3000,
            position: 'bottom'
          });
          toast.present();
        });
      }*/
  }

  delete(recomendacao) {
    /*this.dao.delete(recomendacao);
    this.list();*/
  }

  tirarFoto() : void {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    this.utils.showLoading("Carregando foto...");
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.utils.dismissLoading();
    }, (err) => {
      // Handle error
    });
  }

  escolherFoto() : void {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.utils.showLoading("Carregando foto...");
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.utils.dismissLoading();
    }, (err) => {
      // Handle error
    });
  }

  formOk() : boolean {
    switch (this.passo) {
      case 1:
        if (this.diarista.nome && this.diarista.cpf && this.diarista.email && this.diarista.telefone) return true;
        return false;
      case 2:
        if (this.base64Image || this.platform.is('core') || this.platform.is('mobileweb')) return true;
        return false;
      case 3:
        if (this.diarista.endereco.cep && this.diarista.endereco.endereco && this.diarista.endereco.bairro && this.diarista.endereco.numero) return true;
        return false;
      default:
        return false;
    }
  }

  salvar() {
    this.diarista.recomendacoes = this.listRecomendacoes;
    console.log('salvar diarista:'+ JSON.stringify(this.diarista));
    this.diaristasProvider.create(this.diarista).then(
      (result: any) => {
        console.log('sucesso retornado do provider: '+JSON.stringify(result));

        this.diaristaResponse.id = result.id;
        this.diaristaResponse.nome = result.nome;
        this.diaristaResponse.cpf = result.cpf;
        this.diaristaResponse.rg = result.rg;
        this.diaristaResponse.telefone = result.telefone;
        this.diaristaResponse.sindicato = result.sindicato;
        this.diaristaResponse.autorizado = result.autorizado;
        this.diaristaResponse.dataCadastro = result.dataCadastro;
        this.diaristaResponse.dataAutorizado = result.dataAutorizado;
        this.diaristasProvider.insert(this.diaristaResponse)
          .then(() => {
            console.log("diarista salva");
          })
          .catch(() => {
            console.log("erro ao salvar diarista");
          });

        this.utils.showToast('Solicitação de cadastro como Diarista enviado. Código: '+result.id, 3000);
      }
    ).catch(
      (error: any) => {
        console.log('erro retornado do provider:'+ JSON.stringify(error));
        this.utils.showToast('Erro ao Solicitar cadastro como Diarista: '+error.error, 3000);
      }
    );
  }

  //listar diaristas com cadastro pendente
  getAllPendant() {
    console.log('listar diaristas com cadastro pendente');
    this.diaristasProvider.getAllPendant()
      .then((result: any) => {
        console.log('sucesso retornado do provider: '+JSON.stringify(result));
      })
      .catch((error: any) => {
        console.log('erro retornado do provider:'+ JSON.stringify(error));
        this.utils.showToast('Erro ao listar Diaristas com cadastro pendente.', 3000);
      })
  }
}
