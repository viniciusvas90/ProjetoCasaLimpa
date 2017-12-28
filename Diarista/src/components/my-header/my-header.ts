import { Component } from '@angular/core';

@Component({
  selector: 'my-header',
  templateUrl: 'my-header.html'
})
export class MyHeaderComponent {

  title: string;

  constructor() {
    console.log('MyHeaderComponent Component');
    this.title = 'teste';
  }

}
