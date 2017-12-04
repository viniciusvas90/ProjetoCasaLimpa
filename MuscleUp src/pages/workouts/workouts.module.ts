import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorksetsPage } from './worksets';

@NgModule({
  declarations: [
    WorksetsPage,
  ],
  imports: [
    IonicPageModule.forChild(WorksetsPage),
  ],
  exports: [
    WorksetsPage
  ]
})
export class WorksetsPageModule {}
