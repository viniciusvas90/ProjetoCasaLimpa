import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UsersProvider } from '../users/users';
import { Cliente } from '../../models/cliente';
import { Usuario } from '../../models/usuario';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ClientesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientesProvider {

  private API_URI = 'http://localhost:8100/api';

  constructor(private http: Http,
              private storage: Storage,
              private usersProvider: UsersProvider) {
    console.log('Hello ClientesProvider Provider');
  }

  create(cliente: Cliente) {
    console.log('create(data)');
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer '+this.usersProvider.getToken());
      this.usersProvider.getUsuarioStorage().then((user: Usuario) => {
        cliente.usuario = user;
        this.http.post(this.API_URI+"/clientes", cliente, {headers: headers})
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
      this.http.get(this.API_URI+"/clientes/pendentes")
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

  public insert(cliente: Cliente) {
    //let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save('cliente', cliente  );
  }

  public update(key: string, cliente: Cliente) {
    return this.save(key, cliente);
  }

  private save(key: string, cliente: Cliente) {
    return this.storage.set(key, cliente);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public loadClienteStorage() : Promise<any> {
    return this.storage.get('cliente');
  }

}
