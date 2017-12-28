import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Loading, PopoverController, Events } from 'ionic-angular';
import { OptionsComponent } from "../../components/options/options";

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {
  private loadingActive: boolean = false;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
    public events: Events
  ) { }

  private loader: Loading;

  public showToast(msg: string, duration: number): void {
    this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: 'bottom'
    }).present();
  }

  public showLoading(msg: string) {
    if (!this.loadingActive) {
      this.loadingActive = true;
      this.loader = this.loadingCtrl.create({
        content: msg
      });
      this.loader.present();
    }
  }

  public dismissLoading() {
    if (this.loadingActive) {
      this.loadingActive = false;
      this.loader.dismiss();
    }
  }

  presentOptionsPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(OptionsComponent);
    popover.present({
      ev: ev
    });

    this.events.subscribe('user:logout', () => {
      popover.dismiss();
    });
  }

}
