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
      this.navCtrl.push("CadastroDiaristasPage");
    } else if (flag === 'cliente') {      
      this.navCtrl.push("CadastroClientePage");
    }
  }

}
