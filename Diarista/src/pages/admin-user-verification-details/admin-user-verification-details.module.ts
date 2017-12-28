import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUserVerificationDetailsPage } from './admin-user-verification-details';

@NgModule({
  declarations: [
    AdminUserVerificationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUserVerificationDetailsPage),
  ],
})
export class AdminUserVerificationDetailsPageModule {}
