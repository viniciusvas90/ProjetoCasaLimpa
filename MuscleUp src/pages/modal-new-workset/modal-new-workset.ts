import { Component } from '@angular/core';
import { IonicPage, ViewController, ModalController, ToastController, NavParams } from 'ionic-angular';
import { ModalWorksetAddExercisePage } from '../modal-workset-add-exercise/modal-workset-add-exercise';
import { daoWorksetExercises } from '../../daos/daoWorksetExercises';

@IonicPage()
@Component({
  selector: 'page-modal-new-workset',
  templateUrl: 'modal-new-workset.html',
})
export class ModalNewWorksetPage {
  treino = null;
  dao = null;
  listTreinosExercicios = [];

  constructor(public viewCtrl: ViewController, public modalCtrl: ModalController, private toastCtrl: ToastController, params: NavParams) {
    this.dao = new daoWorksetExercises();
    this.treino = params.get("parametro") || {descricao: ""};
    this.listExercicios();
  }

  listExercicios() {
    this.dao.getList(this.treino.id, (lista) => {
      this.treino.lista_exercises = lista;
      this.listTreinosExercicios = lista;
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  salvar() {
    this.treino.listTreinosExercicios = this.listTreinosExercicios;
    this.viewCtrl.dismiss(this.treino);
  }

  addExercicio() {
    let modal = this.modalCtrl.create(ModalWorksetAddExercisePage);
    modal.onDidDismiss((data) => {
      if (data) {
        this.listTreinosExercicios.push(data);
        let toast = this.toastCtrl.create({
          message: 'Exercício adicionado ao treino com sucesso',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    })

    modal.present();
  }

  delete(exercicio) {

    for(var i = 0; i < this.listTreinosExercicios.length; i++) {
      if (this.listTreinosExercicios[i].exercise_id == exercicio.exercise_id) {
        this.listTreinosExercicios.splice(i, 1);
      }
    }
  }

}
