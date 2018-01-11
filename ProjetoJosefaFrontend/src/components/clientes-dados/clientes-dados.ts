import { Component, Input } from '@angular/core';
import { Cliente } from '../../models/cliente';

/**
 * Generated class for the ClientesDadosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'clientes-dados',
  templateUrl: 'clientes-dados.html'
})
export class ClientesDadosComponent {

  @Input() cliente: Cliente;

  constructor() {
    console.log('Hello ClientesDadosComponent Component');
  }

}
