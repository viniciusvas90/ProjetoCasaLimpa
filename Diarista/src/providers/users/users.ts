import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  private API_URI = 'http://localhost:8100/api';

  constructor(public http: Http) {
    console.log('Hello UsersProvider Provider');
  }

  register(email: string, password: string, nome: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password,
        nome: nome
      };

      this.http.post(this.API_URI + '/register', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          console.log(JSON.stringify(error));
          reject(error.json());
        });
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password
      };

      console.log('provider = login():'+ data.email +' '+data.password);

      this.http.post(this.API_URI + '/login', data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          console.log(JSON.stringify(error));
          reject(error.json());
        });
    });
  }

}
