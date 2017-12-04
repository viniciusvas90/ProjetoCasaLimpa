import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNewExercisePage } from './modal-new-exercise';

@NgModule({
  declarations: [
    ModalNewExercisePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNewExercisePage),
  ],
  exports: [
    ModalNewExercisePage
  ]
})
export class ModalNewExercisePageModule {}
