import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesImoveisPage } from './clientes-imoveis';

@NgModule({
  declarations: [
    ClientesImoveisPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientesImoveisPage),
  ],
})
export class ClientesImoveisPageModule {}
