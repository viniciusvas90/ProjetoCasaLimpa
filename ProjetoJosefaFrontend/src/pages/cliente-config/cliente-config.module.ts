import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteConfigPage } from './cliente-config';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ClienteConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteConfigPage),
    ComponentsModule,
  ],
})
export class ClienteConfigPageModule {}
