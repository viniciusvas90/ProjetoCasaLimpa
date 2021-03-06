import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { UsersProvider } from '../users/users';
import { Diarista } from '../../models/diarista';
import { Usuario } from '../../models/usuario';

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
    private usersProvider: UsersProvider) {
    console.log('DiaristasProvider');
  }

  public insert(diarista: Diarista) {
    //let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save('diarista', diarista);
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

  public loadDiaristaStorage(): Promise<any> {
    return this.storage.get('diarista');
  }

  create(diarista: Diarista) {
    console.log('create(data)');
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + this.usersProvider.getToken());
      this.usersProvider.getUsuarioStorage().then((user: Usuario) => {
        diarista.usuario = user;
        this.http.post(this.API_URI + "/diaristas", diarista, { headers: headers })
          .subscribe((result: any) => {
            this.usersProvider.storeUser(user.email);
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
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + this.usersProvider.getToken());
      this.http.get(this.API_URI + "/diaristas/pendentes", { headers: headers })
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

  public storeDiarista(idUsuario: number): Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.usersProvider.getToken());

    return new Promise((resolve, reject) => {
      this.http.get(this.API_URI + '/diaristas/' + idUsuario, { headers: headers })
        .subscribe((result: any) => {
          let diarista: Diarista = JSON.parse(result._body);
          this.save('diarista', diarista).then(() => {
            console.log('diarista guardado', diarista);
            resolve();
          });
        },
        (error) => {
          console.error(JSON.stringify(error));
        });
    });
  }

  autorizar(diarista: Diarista) {
    console.log('autorizar(data)', diarista);
    return new Promise((resolve, reject) => {
      console.log(this.usersProvider.getToken());
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + this.usersProvider.getToken());
      this.http.put(this.API_URI + "/diaristas/authorize", diarista, { headers: headers })
        .subscribe((result: any) => {
          console.log(result);
          resolve(result);
        },
        (error) => {
          console.error(error);
          reject(error);
        });
    });
  }
}
