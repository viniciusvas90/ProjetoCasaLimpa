import { Component } from '@angular/core';
import { IonicPage, ModalController, ToastController } from 'ionic-angular';
import { ModalBodyMeasurementsPage } from '../modal-body-measurements/modal-body-measurements';
import { daoBodyMeasurements } from '../../daos/daoBodyMeasurements';

@IonicPage()
@Component({
  selector: 'page-body-measurements',
  templateUrl: 'body-measurements.html',
})
export class BodyMeasurementsPage {

  dao = null;
  lastBodyMeasurements = {};

  constructor(public modalCtrl: ModalController, private toastCtrl: ToastController) {
    this.dao = new daoBodyMeasurements();
    this.dao.getUltimaBodyMeasurements((body_measurements) => {
      this.lastBodyMeasurements = body_measurements;
    });
  }

  insert() {
    let modal = this.modalCtrl.create(ModalBodyMeasurementsPage);
    modal.onDidDismiss((data) => {
      if (data) {
        this.dao.insert(data, (body_measurements) => {
          this.lastBodyMeasurements = body_measurements;
          let toast = this.toastCtrl.create({
            message: 'Avaliação inserida com sucesso',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
      }
    })
    modal.present();
  }

}
