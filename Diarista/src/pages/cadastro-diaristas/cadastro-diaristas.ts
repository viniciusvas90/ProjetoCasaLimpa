import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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
  diarista = { nome: "", cpf: "", cep: "", endereco: "", bairro: "", numero : "", email: "", telefone: "" };
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

  constructor(private toastCtrl: ToastController, private camera: Camera, public platform: Platform, public loadingCtrl: LoadingController) {
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
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  escolherFoto() : void {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
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
        if (this.base64Image || this.platform.is('core')) return true;
        return false;
      case 3:
        if (this.diarista.cep && this.diarista.endereco && this.diarista.bairro && this.diarista.numero) return true;
        return false;
      default:
        return false;
    }
  }

  salvar() : void {
    console.log(this.diarista);
  }

}
