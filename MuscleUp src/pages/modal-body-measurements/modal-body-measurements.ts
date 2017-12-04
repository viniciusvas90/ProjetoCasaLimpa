import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalBodyMeasurementsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-body-measurements',
  templateUrl: 'modal-body-measurements.html',
})
export class ModalBodyMeasurementsPage {
  //body_measurements = null;
  constructor(public viewCtrl: ViewController) {
    //this.body_measurements = {"id": "", "body_measurements_date" : "", "height" : "", "weight" : "",
    //                  "right_arm" : "", "left_arm" : "", "left_forearm" : "",
    //                  "right_forearm" : "", "shoulders" : "", "chest" : "", "right_thigh" : "",
    //                  "left_thigh" : "", "right_calf" : "", "left_calf" : "", "waist" : ""}
  }

  cancel() {
    this.viewCtrl.dismiss();
  }


  //salvar(body_measurements) {
  salvar(body_measurements) {
    //this.viewCtrl.dismiss(this.body_measurements);
    this.viewCtrl.dismiss(body_measurements);
  }
}
