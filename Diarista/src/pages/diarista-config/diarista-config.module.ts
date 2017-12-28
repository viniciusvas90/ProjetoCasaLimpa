import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaristaConfigPage } from './diarista-config';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    DiaristaConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaristaConfigPage),
    ComponentsModule,
  ],
})
export class DiaristaConfigPageModule {}
