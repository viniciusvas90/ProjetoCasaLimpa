import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUserVerificationDetailsPage } from './admin-user-verification-details';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    AdminUserVerificationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUserVerificationDetailsPage),
    ComponentsModule,
  ],
})
export class AdminUserVerificationDetailsPageModule {}
