import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OptionsComponent } from './options/options';
import { MyHeaderComponent } from './my-header/my-header';
import { IonicModule } from "ionic-angular";

@NgModule({
  declarations: [
    OptionsComponent,
    MyHeaderComponent
  ],
  imports: [IonicModule],
  exports: [
    OptionsComponent,
    MyHeaderComponent
  ],
  entryComponents: [
    MyHeaderComponent,
    OptionsComponent
  ]
})
export class ComponentsModule { }
