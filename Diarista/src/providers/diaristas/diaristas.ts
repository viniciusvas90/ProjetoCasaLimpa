import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/map';

/*
  Generated class for the DiaristasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiaristasProvider {

  private API_URI = 'http://localhost:8080/diaristas';

  constructor(public http: Http, private storage: Storage, private datepipe: DatePipe) {
    console.log('DiaristasProvider');
  }

  public insert(diarista: Diarista) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, diarista  );
  }

  public update(key: string, diarista: Diarista) {
    return this.save(key, diarista);
  }

  private save(key: string, diarista: Diarista) {
    return this.storage.set(key, diarista);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  create(data) {
    console.log('create(data)');
    return new Promise((resolve, reject) => {
      console.log('Promise: '+data.nome);
      this.http.post(this.API_URI, data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
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

export class Diarista {
  id : number;
  nome: string;
  cpf: string;
  rg: string;
  telefone: string;
  sindicato: string;
  autorizado: boolean;
  dataCadastro: Date;
  dataAutorizado: Date;
}
