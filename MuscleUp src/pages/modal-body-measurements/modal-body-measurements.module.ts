import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalBodyMeasurementsPage } from './modal-body-measurements';

@NgModule({
  declarations: [
    ModalBodyMeasurementsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalBodyMeasurementsPage),
  ],
  exports: [
    ModalBodyMeasurementsPage
  ]
})
export class ModalBodyMeasurementsPageModule {}
