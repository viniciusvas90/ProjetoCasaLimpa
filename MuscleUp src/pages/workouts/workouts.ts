import { Component } from '@angular/core';
import { IonicPage, ModalController, ToastController } from 'ionic-angular';
import { ModalNewWorksetPage } from '../modal-new-workset/modal-new-workset';
import { daoWorkset } from '../../daos/daoWorkset';
import { daoWorksetExercises } from '../../daos/daoWorksetExercises';

@IonicPage()
@Component({
  selector: 'page-worksets',
  templateUrl: 'worksets.html',
})
export class WorksetsPage {
  dao = null;
  daoWorksetExerc = null;
  listTreinos = [];

  constructor(public modalCtrl: ModalController, private toastCtrl: ToastController) {
    this.dao = new daoWorkset();
    this.daoWorksetExerc = new daoWorksetExercises();
    this.list();
  }

  list() {
    this.dao.getList((lista) => {
      this.listTreinos = lista;
      this.listExercicios();
    });
  }

  listExercicios() {
    for (var i = 0; i < this.listTreinos.length; i++) {
      this.daoWorksetExerc.getList(this.listTreinos[i].id, (lista) => {
        this.listTreinos[i].lista_exercises = lista;
      });
    }
  }

  insert() {
    let modal = this.modalCtrl.create(ModalNewWorksetPage);
    modal.onDidDismiss((data) => {
      if (data) {
        this.dao.insert(data, (treino) => {
          treino.in_ativo_texto = treino.in_ativo ? "Ativo" : "Inativo";
          this.listTreinos.push(treino);
          //inserindo os exercicios do treino
          let daoWorksetExerc = null;
          for (var i = 0; i < treino.listTreinosExercicios.length; i++) {
            daoWorksetExerc = new daoWorksetExercises();
            treino.listTreinosExercicios[i].cd_workset = treino.id;
            daoWorksetExerc.insert(treino.listTreinosExercicios[i]);
          }
          //resposta
          let toast = this.toastCtrl.create({
            message: 'Treino inserido com sucesso',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
      }
    })
    modal.present();
  }

  edit(treino) {
    let modal = this.modalCtrl.create(ModalNewWorksetPage, {parametro: treino});
    modal.onDidDismiss((data) => {
      if (data) {
        this.dao.delete(treino);
        this.dao.insert(data, (treino) => {
          treino.in_ativo_texto = treino.in_ativo ? "Ativo" : "Inativo";
          //inserindo os exercicios do treino
          let daoWorksetExerc = null;
          for (var i = 0; i < treino.listTreinosExercicios.length; i++) {
            daoWorksetExerc = new daoWorksetExercises();
            treino.listTreinosExercicios[i].cd_workset = treino.id;
            daoWorksetExerc.insert(treino.listTreinosExercicios[i]);
          }
          //resposta
          let toast = this.toastCtrl.create({
            message: 'Treino alterado com sucesso',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
      }
    });
    modal.present();
  }

  delete(treino) {
    this.dao.delete(treino);
    this.list();
  }

}
