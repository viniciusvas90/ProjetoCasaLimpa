import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, ToastController, NavParams } from 'ionic-angular';
import { daoWorksetExercises } from '../../daos/daoWorksetExercises';

@IonicPage()
@Component({
  selector: 'page-modal-workset-detail',
  templateUrl: 'modal-workset-detail.html',
})
export class ModalWorksetDetailPage {

  treino = null;
  dao = null;
  teste = null;

  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, private toastCtrl: ToastController, params: NavParams) {
    this.dao = new daoWorksetExercises();
    this.treino = params.get("parametro") || {descricao: ""};
    this.listExercicios();
  }

  listExercicios() {
    this.dao.getList(this.treino.id, (lista) => {
      this.treino.lista_exercises = lista;
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
