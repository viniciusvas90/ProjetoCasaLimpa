//https://www.sqlite.org/lang_createtable.html
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class daoWorkSheet {
  private sqlite: SQLite;
  constructor() {
    this.sqlite = new SQLite();
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
  }

  insert(treino, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("INSERT INTO tb_worksheet(worksheet_description) VALUES (?);",
                    [treino.worksheet_description]).then((data) => {
    		treino.id = data.insertId;
    		successCallback(treino);
    		console.log("Registro inserido em tb_worksheet");
    	}, (error => {
    		console.log("Erro ao inserir registro em tb_worksheet: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  update(treino, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("UPDATE tb_worksheet SET worksheet_description = ?, ativo = ? WHERE id = ?;",
                    [treino.workssheet_description, treino.ativo, treino.id]).then((data) => {
    		successCallback(treino);
    		console.log("Registro alterado em tb_worksheet");
    	}, (error => {
    		console.log("Erro ao alterar registro em tb_worksheet: " + JSON.stringify(error.err));
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
    	db.executeSql("SELECT * FROM tb_worksheet order by id desc;", []).then((data) => {
    		let listaWorkSheets = [];
      	let listaWorkSheetsExer = [];
    		for (var i = 0; i < data.rows.length; i++) {
          listaWorkSheets.push({
        		"id" : data.rows.item(i).id,
          	"workssheet_description" : data.rows.item(i).workssheet_description,
            "ativo" : data.rows.item(i).ativo,
            "ativo_texto" : data.rows.item(i).ativo ? "Ativo" : "Inativo",
            "lista_worksets" : listaWorkSets
          });
    		}
    		successCallback(listaWorkSheets);
    		console.log("Registros recuperados em tb_worksheet");
    	}, (error => {
    		console.log("Erro ao recuperar registros em tb_worksheet: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  getListAtivos(successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("SELECT * FROM tb_worksheet order by workssheet_description desc;",[]).then((data) => {
    		let listaWorkSheets = [];
      	let listaWorkSheetsExer = [];
    		for (var i = 0; i < data.rows.length; i++) {
          listaWorkSheets.push({
        		"id" : data.rows.item(i).id,
          	"workssheet_description" : data.rows.item(i).workssheet_description,
            "ativo" : data.rows.item(i).ativo,
            "ativo_texto" : data.rows.item(i).ativo ? "Ativo" : "Inativo",
            "lista_worksets" : listaWorkSets
          });
    		}
    		successCallback(listaWorkSheets);
    		console.log("Registros ativos recuperados em tb_worksheet");
    	}, (error => {
    		console.log("Erro ao recuperar registros em tb_worksheet: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  delete(treino, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("DELETE FROM tb_worksheet where id = ?;", [treino.id]).then((data) => {
    		successCallback(treino);
    		console.log("Registro excluido de tb_worksheet");
    	}, (error => {
    		console.log("Erro ao excluir registro de tb_worksheet: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }
}
