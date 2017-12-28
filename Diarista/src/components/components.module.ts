import { NgModule } from '@angular/core';
import { OptionsComponent } from './options/options';
import { MyHeaderComponent } from './my-header/my-header';
import { IonicModule } from "ionic-angular";
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
    OptionsComponent
  ]
})
export class ComponentsModule { }
