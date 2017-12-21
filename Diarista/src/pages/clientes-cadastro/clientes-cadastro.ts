import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Cliente } from '../../models/cliente';
import { Camera } from '@ionic-native/camera';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { Imovel } from '../../models/imovel';
import { Utils } from '../../utils';

/**
 * Generated class for the ClientesCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clientes-cadastro',
  templateUrl: 'clientes-cadastro.html',
})
export class ClientesCadastroPage {

  cliente: Cliente;
  imovel: Imovel;
  passo = 1;
  public unregisterBackButtonAction: any;

  options = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
  }

  constructor(private utils: Utils,
              public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              public platform: Platform,
              private clientesProvider: ClientesProvider) {
    this.cliente = new Cliente();
    this.imovel = new Imovel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientesCadastroPage');
    this.initializeBackButtonCustomHandler();
    this.clientesProvider.loadClienteStorage().then((data) => {
      if (data) {
        this.cliente = data;
      }
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

  private addImovel() : void {
    this.cliente.imoveis.push(this.imovel);
  }

  private tirarFoto() : void {
    this.options.sourceType = this.camera.PictureSourceType.CAMERA;
    this.utils.showLoading("Carregando foto...");
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.cliente.fotoBase64Image = 'data:image/jpeg;base64,' + imageData;
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
      this.cliente.fotoBase64Image = 'data:image/jpeg;base64,' + imageData;
      this.utils.dismissLoading();
    }, (err) => {
      // Handle error
    });
  }

  salvar() {
    this.clientesProvider.insert(this.cliente)
      .then(() => {
        console.log("Cliente salvo: "+JSON.stringify(this.cliente.cpf));
      })
      .catch(() => {
        console.log("erro ao salvar Cliente");
      });

    this.clientesProvider.create(this.cliente).then(
      (result: any) => {
        this.utils.showToast('Solicitação de cadastro como Cliente enviado. Código: '+JSON.parse(result._body).id, 3000);
        this.navCtrl.popToRoot();
      }
    ).catch(
      (error: any) => {
        let mensagem = error.status;
        if (error.status == 500) mensagem = 'Sistema indisponível.';
        this.utils.showToast('Erro ao Solicitar cadastro como Cliente: '+mensagem, 3000);
      }
    );
  }

}
