import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-new-exercise',
  templateUrl: 'modal-new-exercise.html',
})
export class ModalNewExercisePage {
  exercicio = null;
  constructor(public viewCtrl: ViewController, params: NavParams) {
    this.exercicio = params.get("parametro") || {descricao: ""};
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  salvar() {
    this.viewCtrl.dismiss(this.exercicio);
  }

}
