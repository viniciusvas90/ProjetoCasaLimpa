import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/map';
import { UsersProvider, Usuario } from '../users/users';

/*
  Generated class for the DiaristasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiaristasProvider {

  private API_URI = 'http://localhost:8100/api';

  constructor(private http: Http,
              private storage: Storage,
              private datepipe: DatePipe,
              private usersProvider: UsersProvider) {
    console.log('DiaristasProvider');
  }

  public insert(diarista: Diarista) {
    //let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save('diarista', diarista  );
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

  public loadDiaristaStorage() : Promise<any> {
    return this.storage.get('diarista');
  }

  create(diarista: Diarista) {
    console.log('create(data)');
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer '+this.usersProvider.getToken());
      this.usersProvider.getUsuarioStorage().then((user: Usuario) => {
        diarista.usuario = user;
        this.http.post(this.API_URI+"/diaristas", diarista, {headers: headers})
        .subscribe((result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        });
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
  fotoBase64Image : string;
  usuario : Usuario;
  recomendacoes: Array<{nome:string; contato:string}>;
  endereco: {
    bairro: string, numero : string, cep: string, endereco: string
  };
}
