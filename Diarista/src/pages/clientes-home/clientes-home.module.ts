import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesHomePage } from './clientes-home';

@NgModule({
  declarations: [
    ClientesHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientesHomePage),
  ],
})
export class ClientesHomePageModule {}
