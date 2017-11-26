import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DiaristasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiaristasProvider {

  private API_URI = 'http://10.70.34.238:8100/diaristas';

  constructor(public http: Http) {
    console.log('DiaristasProvider');
  }

  create(data) {
    console.log('create(data)');
    return new Promise((resolve, reject) => {
      console.log('Promise: '+data.nome);
      this.http.post(this.API_URI, data)
        .subscribe((result: any) => {
          console.log(result.json());
          resolve(result.json());
        },
        (error) => {
          console.log(error.message);
          reject(error.json());
        });
    });
  }

  getAllPendant() {
    console.log('getAllPendant()');
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URI+"/pendentes")
        .subscribe((result: any) => {
          console.log('sucesso');
          resolve(result.json());
        },
        (error) => {
          console.log('erro');
          reject(error.json());
        });
    });
  }
}
