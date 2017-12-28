import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaristaInfoPage } from './diarista-info';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    DiaristaInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaristaInfoPage),
    ComponentsModule,
  ],
})
export class DiaristaInfoPageModule {}
