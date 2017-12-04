import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalWorksetDetailPage } from './modal-workset-detail';

@NgModule({
  declarations: [
    ModalWorksetDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalWorksetDetailPage),
  ],
  exports: [
    ModalWorksetDetailPage
  ]
})
export class ModalWorksetDetailPageModule {}
