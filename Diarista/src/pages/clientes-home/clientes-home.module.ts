import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesHomePage } from './clientes-home';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ClientesHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientesHomePage),
    ComponentsModule,
  ],
})
export class ClientesHomePageModule {}
