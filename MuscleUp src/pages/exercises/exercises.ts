import { Component } from '@angular/core';
import { IonicPage, ModalController, ToastController } from 'ionic-angular';
import { ModalNewExercisePage } from '../modal-new-exercise/modal-new-exercise';
import { daoExercise } from '../../daos/daoExercise';

@IonicPage()
@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html',
})

export class ExercisesPage {
  dao = null;
  listExercicios = [];
  constructor(public modalCtrl: ModalController, private toastCtrl: ToastController) {
    this.dao = new daoExercise();
    //comment while testing on browser
    this.list();
  }

  list() {
    this.dao.getList((lista) => {
      this.listExercicios = lista;
    });
  }

  insert() {
    let modal = this.modalCtrl.create(ModalNewExercisePage);
    modal.onDidDismiss((data) => {
      if (data) {
        this.dao.insert(data, (exercicio) => {
          this.listExercicios.push(exercicio);
          let toast = this.toastCtrl.create({
            message: 'Exercício inserido com sucesso',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
      }
    })
    modal.present();
  }

  edit(exercicio) {
    let modal = this.modalCtrl.create(ModalNewExercisePage, {parametro: exercicio});
    modal.onDidDismiss((data) => {
      if (data) {
        this.dao.update(data, (exercicio) => {
          let toast = this.toastCtrl.create({
            message: 'Exercício alterado com sucesso',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });
      }
    });
    modal.present();
  }

  delete(exercicio) {
    this.dao.delete(exercicio);
    this.list();
  }

}
