//https://www.sqlite.org/lang_createtable.html
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class daoWorkset {
  private sqlite: SQLite;
  constructor() {
    this.sqlite = new SQLite();
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
  }

  insert(workset, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("INSERT INTO tb_workset(worksheet_id, workset_description, workset_letter) VALUES (?,?,?);",
                    [workset.worksheet_id, workset.workset_description, workset.workset_letter]).then((data) => {
    		workset.id = data.insertId;
    		successCallback(workset);
    		console.log("Registro inserido em tb_workset");
    	}, (error => {
    		console.log("Erro ao inserir registro em tb_workset: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  update(workset, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("UPDATE tb_workset SET workset_description = ?, workset_letter = ? WHERE id = ?;",
                    [workset.workset_description, workset.workset_letter, workset.id]).then((data) => {
    		successCallback(workset);
    		console.log("Registro alterado em tb_workset");
    	}, (error => {
    		console.log("Erro ao alterar registro em tb_workset: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  getList(successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("SELECT * FROM tb_workset order by id desc;", []).then((data) => {
    		let listaWorksets = [];
      	let listaWorksetsExer = [];
    		for (var i = 0; i < data.rows.length; i++) {
          listaWorksets.push({
        		"id" : data.rows.item(i).id,
        		"worksheet_id" : data.rows.item(i).worksheet_id,
          	"workset_description" : data.rows.item(i).workset_description,
            "workset_letter" : data.rows.item(i).workset_letter,
            "lista_exercises" : listaWorksetsExer
          });
    		}
    		successCallback(listaWorksets);
    		console.log("Registros recuperados em tb_workset");
    	}, (error => {
    		console.log("Erro ao recuperar registros em tb_workset: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  delete(workset, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("DELETE FROM tb_workset where id = ?;", [workset.id]).then((data) => {
    		successCallback(workset);
    		console.log("Registro excluido de tb_workset");
    	}, (error => {
    		console.log("Erro ao excluir registro de tb_workset: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }
}
