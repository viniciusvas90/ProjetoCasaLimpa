import { Component, Input } from '@angular/core';
import { Diarista } from '../../models/diarista';

/**
 * Generated class for the DiaristasDadosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'diaristas-dados',
  templateUrl: 'diaristas-dados.html'
})
export class DiaristasDadosComponent {

  @Input() diarista: Diarista;

  constructor() {
    console.log('Hello DiaristasDadosComponent Component');
  }

}
