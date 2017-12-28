import { Component, Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'options',
  template: `
    <ion-list>
      <button ion-item (click)="logout()">
        <ion-icon name="log-out">Sair</ion-icon>
      </button>
    </ion-list>
  `
})

@Injectable()
export class OptionsComponent {
  constructor(public events: Events) {
    console.log('OptionsComponent Component');
  }

  public logout() {
    this.events.publish('user:logout');
  }
}
