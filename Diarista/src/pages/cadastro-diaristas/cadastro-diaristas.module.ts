import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDiaristasPage } from './cadastro-diaristas';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    CadastroDiaristasPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDiaristasPage),
  ],
  providers: [
    Camera
  ]
})
export class CadastroDiaristasPageModule {}
