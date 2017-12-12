import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { }

  public direcionaCadastro(flag : string) : void {
    if (flag === 'diarista') {
      this.navCtrl.pop();
      this.navCtrl.push("CadastroDiaristasPage");
    } else if (flag === 'cliente') {      
      this.navCtrl.pop();
      this.navCtrl.push("CadastroClientePage");
    }
  }

}
