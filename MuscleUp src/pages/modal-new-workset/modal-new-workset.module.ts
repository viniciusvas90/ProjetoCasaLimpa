import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNewWorksetPage } from './modal-new-workset';

@NgModule({
  declarations: [
    ModalNewWorksetPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNewWorksetPage),
  ],
  exports: [
    ModalNewWorksetPage
  ]
})
export class ModalNewWorksetPageModule {}
