import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminHomePage } from './admin-home';
import { MyHeaderComponent } from "../../components/my-header/my-header";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    AdminHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminHomePage),
    ComponentsModule
  ],
  entryComponents: [
  ]
})
export class AdminHomePageModule {}
