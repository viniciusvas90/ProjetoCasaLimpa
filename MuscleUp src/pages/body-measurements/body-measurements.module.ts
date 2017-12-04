import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BodyMeasurementsPage } from './body-measurements';

@NgModule({
  declarations: [
    BodyMeasurementsPage,
  ],
  imports: [
    IonicPageModule.forChild(BodyMeasurementsPage),
  ],
  exports: [
    BodyMeasurementsPage
  ]
})
export class BodyMeasurementsPageModule {}
