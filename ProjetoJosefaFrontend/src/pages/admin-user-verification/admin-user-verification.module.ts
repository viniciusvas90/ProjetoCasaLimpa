import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUserVerificationPage } from './admin-user-verification';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    AdminUserVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUserVerificationPage),
    ComponentsModule
  ],
})
export class AdminUserVerificationPageModule {}
