//https://www.sqlite.org/lang_createtable.html
//https://www.thepolyglotdeveloper.com/2016/08/using-sqlstorage-instead-sqlite-ionic-2-app/
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class connection {
  constructor() {
  }

  openDB() {
    return new Promise((resolve, reject) => {
      console.log("openDB");
      let sqlite: SQLite;
      sqlite = new SQLite();
      sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((dataBase: SQLiteObject) => {
        resolve(dataBase);
      }).catch(e => reject(console.log("erro ao abrir o banco: "+e)));
    });
  }
}
