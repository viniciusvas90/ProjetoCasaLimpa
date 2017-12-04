import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-new-worksheet',
  templateUrl: 'modal-new-worksheet.html',
})
export class ModalNewWorksheetPage {
  worksheet = null;
  constructor(public viewCtrl: ViewController, params: NavParams) {
    this.worksheet = params.get("parametro") || {descricao: ""};
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  salvar() {
    this.viewCtrl.dismiss(this.worksheet);
  }

}
