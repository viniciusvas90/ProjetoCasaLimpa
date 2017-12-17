import { Component } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { DiaristasProvider, Diarista } from '../../providers/diaristas/diaristas';
import { Utils } from '../../utils';
import 'rxjs/add/operator/catch';

@IonicPage()
@Component({
  selector: 'page-cadastro-diaristas',
  templateUrl: 'cadastro-diaristas.html',
})
export class CadastroDiaristasPage {
  diarista: Diarista;
  passo = 1;
  recomendacao = { nome: "", contato: "" };
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
    this.diarista = new Diarista();
    this.diarista.endereco = {bairro:"",numero:"",cep:"",endereco:""};
    this.diarista.recomendacoes = new Array;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroDiaristasPage');
    this.initializeBackButtonCustomHandler();
    this.diaristasProvider.loadDiaristaStorage().then((data) => {
      this.diarista = data;
    });
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
    this.diarista.recomendacoes.push(item);
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
      this.diarista.fotoBase64Image = 'data:image/jpeg;base64,' + imageData;
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
      this.diarista.fotoBase64Image = 'data:image/jpeg;base64,' + imageData;
      this.utils.dismissLoading();
    }, (err) => {
      // Handle error
    });
  }

  formOk() : boolean {
    switch (this.passo) {
      case 1:
        if (this.diarista.cpf && this.diarista.telefone) return true;
        return false;
      case 2:
        if (this.diarista.fotoBase64Image || this.platform.is('core') || this.platform.is('mobileweb')) return true;
        return false;
      case 3:
        if (this.diarista.endereco.cep && this.diarista.endereco.endereco && this.diarista.endereco.bairro && this.diarista.endereco.numero) return true;
        return false;
      default:
        return false;
    }
  }

  salvar() {
    this.diaristasProvider.insert(this.diarista)
      .then(() => {
        console.log("diarista salva: "+JSON.stringify(this.diarista.cpf));
      })
      .catch(() => {
        console.log("erro ao salvar diarista");
      });

    this.diaristasProvider.create(this.diarista).then(
      (result: any) => {
        console.log(JSON.stringify(result));
        this.utils.showToast('Solicitação de cadastro como Diarista enviado. Código: '+JSON.parse(result._body).id, 3000);
      }
    ).catch(
      (error: any) => {
        let mensagem = error.status;
        if (error.status == 500) mensagem = 'Sistema indisponível.';
        this.utils.showToast('Erro ao Solicitar cadastro como Diarista: '+mensagem, 3000);
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
