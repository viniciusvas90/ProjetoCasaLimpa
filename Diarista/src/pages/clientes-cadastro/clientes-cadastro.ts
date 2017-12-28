import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Cliente } from '../../models/cliente';
import { Camera } from '@ionic-native/camera';
import { ClientesProvider } from '../../providers/clientes/clientes';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-clientes-cadastro',
  templateUrl: 'clientes-cadastro.html',
})
export class ClientesCadastroPage {
  pageTitle: string = 'Sou um(a) Diarista';

  cliente: Cliente;
  public unregisterBackButtonAction: any;
  formGroup: FormGroup;

  options = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  constructor(private utils: UtilsProvider,
    public navCtrl: NavController,
    private camera: Camera,
    public platform: Platform,
    private clientesProvider: ClientesProvider,
    private formBuilder: FormBuilder) {
    this.cliente = new Cliente();

    this.formGroup = formBuilder.group({
      cpf: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientesCadastroPage');
    this.clientesProvider.loadClienteStorage().then((data) => {
      if (data) {
        this.cliente = data;
      }
    });
  }

  private tirarFoto(): void {
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

  escolherFoto(): void {
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
        console.log("Cliente salvo: " + JSON.stringify(this.cliente.cpf));
      })
      .catch(() => {
        console.log("erro ao salvar Cliente");
      });

    this.clientesProvider.create(this.cliente).then(
      (result: any) => {
        this.utils.showToast('Solicitação de cadastro como Cliente enviado. Código: ' + JSON.parse(result._body).id, 3000);
        this.navCtrl.setRoot('ApresentacaoPage');
        this.navCtrl.popToRoot();
      }
    ).catch((error: any) => {
      let mensagem = error.status;
      if (error.status == 500) mensagem = 'Sistema indisponível.';
      this.utils.showToast('Erro ao Solicitar cadastro como Cliente: ' + mensagem, 3000);
    });
  }

  //insertImovel() {
  //  let modal = this.modalCtrl.create(ClientesCadastroImoveisPage);
  //  modal.onDidDismiss((data) => {
  //    if (data) {
  //      this.cliente.imoveis.push(data);
  //      this.utils.showToast('Imóvel adicionado.', 3000);
  //    }
  //  })
  //  modal.present();
  //}

}
