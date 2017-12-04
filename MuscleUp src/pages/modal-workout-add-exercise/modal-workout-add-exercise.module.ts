import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalWorksetAddExercisePage } from './modal-workset-add-exercise';

@NgModule({
  declarations: [
    ModalWorksetAddExercisePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalWorksetAddExercisePage),
  ],
  exports: [
    ModalWorksetAddExercisePage
  ]
})
export class ModalWorksetAddExercisePageModule {}
