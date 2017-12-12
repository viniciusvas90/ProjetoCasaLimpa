import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class Utils {
    
  constructor(private toastCtrl: ToastController, private loadingCtrl:LoadingController) { }

  private loader : Loading;

  public showToast(msg : string, duration : number) : void {
    this.toastCtrl.create({
        message: msg,
        duration: duration,
        position: 'bottom'
    }).present();
  }

  public showLoading(msg : string) {
    this.loader = this.loadingCtrl.create({
        content: msg
    });
    this.loader.present();
  }

  public dismissLoading() { this.loader.dismiss(); }
}