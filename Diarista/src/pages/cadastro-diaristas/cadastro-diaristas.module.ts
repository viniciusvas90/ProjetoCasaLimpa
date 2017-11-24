import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDiaristasPage } from './cadastro-diaristas';
import { Camera } from '@ionic-native/camera';
import { DiaristasProvider } from '../../providers/diaristas/diaristas';

@NgModule({
  declarations: [
    CadastroDiaristasPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDiaristasPage),
  ],
  providers: [
    Camera,
    DiaristasProvider
  ]
})
export class CadastroDiaristasPageModule {}
