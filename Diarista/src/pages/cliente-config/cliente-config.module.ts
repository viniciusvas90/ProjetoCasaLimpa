import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteConfigPage } from './cliente-config';

@NgModule({
  declarations: [
    ClienteConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteConfigPage),
  ],
})
export class ClienteConfigPageModule {}
