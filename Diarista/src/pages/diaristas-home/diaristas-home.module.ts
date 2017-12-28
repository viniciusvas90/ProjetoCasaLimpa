import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaristasHomePage } from './diaristas-home';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    DiaristasHomePage,
  ],
  imports: [
    IonicPageModule.forChild(DiaristasHomePage),
    ComponentsModule,
  ],
})
export class DiaristasHomePageModule {}
