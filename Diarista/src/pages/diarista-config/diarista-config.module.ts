import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaristaConfigPage } from './diarista-config';

@NgModule({
  declarations: [
    DiaristaConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(DiaristaConfigPage),
  ],
})
export class DiaristaConfigPageModule {}
