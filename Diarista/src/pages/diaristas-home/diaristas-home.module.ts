import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiaristasHomePage } from './diaristas-home';

@NgModule({
  declarations: [
    DiaristasHomePage,
  ],
  imports: [
    IonicPageModule.forChild(DiaristasHomePage),
  ],
})
export class DiaristasHomePageModule {}
