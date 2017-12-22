import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesImoveisCadastroPage } from "./clientes-imoveis-cadastro";

@NgModule({
  declarations: [
    ClientesCadastroImoveisPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientesImoveisCadastroPage),
  ],
})
export class ClientesImoveisCadastroPageModule {}
