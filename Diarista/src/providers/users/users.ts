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
  private logado : boolean;
  private token : string;

  constructor(public http: Http) {
    console.log('Hello UsersProvider Provider');
    this.logado = false;
    this.token = null;
  }

  private storeToken(token) : void {    
    localStorage.setItem('token', token);
    this.setSession(token);
  }

  private setSession(token) : void {    
    this.token = token;
    this.logado = true;
  }

  private loadToken() : void {
    this.setSession(localStorage.getItem('token'));
  }

  private destroySession() : void {
    this.logado = false;
    this.token = null;
    localStorage.clear();
  }

  public register(email: string, password: string, nome: string) {
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
          //console.log(JSON.stringify(error));
          reject(error);
        });
    });
  }

  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      var data = {
        email: email,
        password: password
      };

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      //headers.append('Authorization', 'SecretKeyToGenJWTs');

      this.http.post(this.API_URI + '/login', data, {headers: headers})
        .subscribe((result: any) => {
          let token = JSON.stringify(result.headers).split(':')[7].split('"')[1];
          this.storeToken(token);
          resolve(result);
        },
        (error) => {
          //console.log("erro = "+JSON.stringify(error));
          reject(error);
        });
    });
  }

  public logout(){
    /*return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('X-Auth-Token', localStorage.getItem('token'));

      this.http.post(this.API_URI+'/logout', {}, {headers: headers})
        .subscribe(res => {
          localStorage.clear();
        }, (err) => {
          reject(err);
        });
    });*/
    this.destroySession();
  }

}
