import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUserVerificationPage } from './admin-user-verification';

@NgModule({
  declarations: [
    AdminUserVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUserVerificationPage),
  ],
})
export class AdminUserVerificationPageModule {}
