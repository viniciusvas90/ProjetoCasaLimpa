import { Component } from '@angular/core';
import { IonicPage, Platform, ToastController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { DiaristasProvider } from '../../providers/diaristas/diaristas';
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

  constructor(private toastCtrl: ToastController,
              private camera: Camera,
              public platform: Platform,
              public loadingCtrl: LoadingController,
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
    //this.recomendacao.nome = "";
    //this.recomendacao.contato = "";
      /*if (data) {
        this.dao.insert(data, (recomendacao) => {
          this.listRecomendacoes.push(recomendacao);
          let toast = this.toastCtrl.create({
            message: 'Recomendação inserida com sucesso',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
      }*/
  }

  edit(recomendacao) {
      /*if (data) {
        this.dao.update(data, (recomendacao) => {
          let toast = this.toastCtrl.create({
            message: 'Recomendação alterada com sucesso',
            duration: 3000,
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
    let loader = this.loadingCtrl.create({
      content: "Carregando foto..."
    });
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    loader.present();
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      loader.dismiss();
    }, (err) => {
      // Handle error
    });
  }

  escolherFoto() : void {
    let loader = this.loadingCtrl.create({
      content: "Carregando foto..."
    });
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    loader.present();
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      loader.dismiss();
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
        this.toastCtrl.create({
          message: 'Solicitação de cadastro como Diarista enviado. Código: '+result.id, position: 'center', duration: 3000
        }).present();
      }
    ).catch(
      (error: any) => {
        console.log('erro retornado do provider:'+ JSON.stringify(error));
        this.toastCtrl.create({
          message: 'Erro ao Solicitar cadastro como Diarista: '+error.error, position: 'center', duration: 3000
        }).present();
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
        this.toastCtrl.create({
          message: 'Erro ao listar Diaristas com cadastro pendente.', position: 'bottom', duration: 3000
        });
      })
  }
}
