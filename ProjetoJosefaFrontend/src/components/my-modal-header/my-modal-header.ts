import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-modal-header',
  templateUrl: 'my-modal-header.html'
})
export class MyModalHeaderComponent {

  @Input() title: string;
  @Output() clicouFechar = new EventEmitter();

  constructor() {
    console.log('Hello MyModalHeaderComponent Component');
  }

  public fechar(): void {
    this.clicouFechar.emit();
  }

}
