import { ToastController } from 'ionic-angular';

export class Util {    

  constructor(public toastCtrl: ToastController) { }

  public showToast(msg : string, duration : number) : void {
    this.toastCtrl.create({ message: msg, position: 'botton', duration: duration }).present();
  }
}