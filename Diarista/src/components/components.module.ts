import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";

import { OptionsComponent } from './options/options';
import { MyHeaderComponent } from './my-header/my-header';
import { MyModalHeaderComponent } from './my-modal-header/my-modal-header';
import { DiaristasDadosComponent } from './diaristas-dados/diaristas-dados';
import { ClientesDadosComponent } from './clientes-dados/clientes-dados';

@NgModule({
  declarations: [
    OptionsComponent,
    MyHeaderComponent,
    MyModalHeaderComponent,
    DiaristasDadosComponent,
    ClientesDadosComponent
  ],
  imports: [IonicModule],
  exports: [
    OptionsComponent,
    MyHeaderComponent,
    MyModalHeaderComponent,
    DiaristasDadosComponent,
    ClientesDadosComponent
  ],
  entryComponents: [
    MyHeaderComponent,
    MyModalHeaderComponent,
    OptionsComponent
  ]
})
export class ComponentsModule { }
