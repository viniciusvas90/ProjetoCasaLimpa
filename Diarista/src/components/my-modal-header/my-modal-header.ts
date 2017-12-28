import { Component } from '@angular/core';

@Component({
  selector: 'my-modal-header',
  templateUrl: 'my-modal-header.html'
})
export class MyModalHeaderComponent {

  text: string;

  constructor() {
    console.log('Hello MyModalHeaderComponent Component');
    this.text = 'Hello World';
  }

}
