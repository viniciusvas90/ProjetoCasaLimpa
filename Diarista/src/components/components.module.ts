import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";

import { OptionsComponent } from './options/options';
import { MyHeaderComponent } from './my-header/my-header';
import { MyModalHeaderComponent } from './my-modal-header/my-modal-header';

@NgModule({
  declarations: [
    OptionsComponent,
    MyHeaderComponent,
    MyModalHeaderComponent
  ],
  imports: [IonicModule],
  exports: [
    OptionsComponent,
    MyHeaderComponent,
    MyModalHeaderComponent
  ],
  entryComponents: [
    MyHeaderComponent,
    MyModalHeaderComponent,
    OptionsComponent
  ]
})
export class ComponentsModule { }
