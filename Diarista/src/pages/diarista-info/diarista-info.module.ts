import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaristaInfoPage } from './diarista-info';

@NgModule({
  declarations: [
    DiaristaInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaristaInfoPage),
  ],
})
export class DiaristaInfoPageModule {}
