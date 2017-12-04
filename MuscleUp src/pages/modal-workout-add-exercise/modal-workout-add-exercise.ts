import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { daoExercise } from '../../daos/daoExercise';

@IonicPage()
@Component({
  selector: 'page-modal-workset-add-exercise',
  templateUrl: 'modal-workset-add-exercise.html',
})

export class ModalWorksetAddExercisePage {
  treinoExercicio = null;
  exercicios = [];
  constructor(public viewCtrl: ViewController, params: NavParams) {
    this.treinoExercicio = params.get("parametro") || {descricao: ""};

    let dao = new daoExercise();
    dao.getList((lista) => {
      this.exercicios = lista;
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  salvar() {
    this.viewCtrl.dismiss(this.treinoExercicio);
  }

}
