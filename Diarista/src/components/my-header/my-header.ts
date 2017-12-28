import { Component, Input } from '@angular/core';
import { UtilsProvider } from "../../providers/utils/utils";

@Component({
  selector: 'my-header',
  templateUrl: 'my-header.html'
})
export class MyHeaderComponent {

  @Input() title: string;

  constructor(public utils: UtilsProvider) {
    console.log('MyHeaderComponent Component');
  }

}
