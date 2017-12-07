import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  https://www.djamware.com/post/58c1703e80aca7585c808ec1/step-by-step-tutorial-building-ionic-2-rest-api-authentication
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

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.API_URI + '/register', data, {headers: headers})
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          console.log(JSON.stringify(error));
          reject(error);
        });
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password
      };

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      console.log('provider = login():'+ data.email +' '+data.password);

      this.http.post(this.API_URI + '/login', data, {headers: headers})
        .subscribe((result: any) => {
          console.log("sucesso = "+JSON.stringify(result));
          resolve(JSON.stringify(result));
        },
        (error) => {
          console.log("erro = "+JSON.stringify(error));
          reject(error);
        });
    });
  }

  logout(){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('X-Auth-Token', localStorage.getItem('token'));

      this.http.post(this.API_URI+'/logout', {}, {headers: headers})
        .subscribe(res => {
          localStorage.clear();
        }, (err) => {
          reject(err);
        });
    });
  }

}
