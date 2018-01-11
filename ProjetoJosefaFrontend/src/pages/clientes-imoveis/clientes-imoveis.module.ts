import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesImoveisPage } from './clientes-imoveis';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ClientesImoveisPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientesImoveisPage),
    ComponentsModule,
  ],
})
export class ClientesImoveisPageModule {}
