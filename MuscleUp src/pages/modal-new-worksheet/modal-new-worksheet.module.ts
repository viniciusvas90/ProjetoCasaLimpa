import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNewWorksheetPage } from './modal-new-worksheet';

@NgModule({
  declarations: [
    ModalNewWorksheetPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNewWorksheetPage),
  ],
  exports: [
    ModalNewWorksheetPage
  ]
})
export class ModalNewWorksheetPageModule {}
