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

  private API_URI = 'https://localhost:8080/diarista/';

  constructor(public http: Http) {
    console.log('Hello DiaristasProvider Provider');
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URI, data)
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }
}
