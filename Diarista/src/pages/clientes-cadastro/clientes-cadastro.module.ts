import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesCadastroPage } from './clientes-cadastro';

@NgModule({
  declarations: [
    ClientesCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientesCadastroPage),
  ],
})
export class ClientesCadastroPageModule {}
