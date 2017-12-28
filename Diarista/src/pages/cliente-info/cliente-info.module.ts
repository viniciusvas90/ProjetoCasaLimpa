import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteInfoPage } from './cliente-info';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ClienteInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteInfoPage),
    ComponentsModule,
  ],
})
export class ClienteInfoPageModule {}
