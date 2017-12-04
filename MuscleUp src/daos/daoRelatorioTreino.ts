//https://www.sqlite.org/lang_createtable.html
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class daoRelatorioTreino {
  private sqlite: SQLite;
  constructor() {
    this.sqlite = new SQLite();
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
  }

  insert(relatorio_workset, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("INSERT INTO tb_report_workset(dt_report_workset, cd_workset, exercise_id, series_number, repetitions_number, resting_time, charge) VALUES (?,?,?,?,?,?,?);",
        [relatorio_workset.dt_report_workset, relatorio_workset.cd_workset, relatorio_workset.exercise_id, relatorio_workset.series_number, relatorio_workset.repetitions_number, relatorio_workset.resting_time, relatorio_workset.charge]).then((data) => {
    		relatorio_workset.id_report_workset = data.insertId;
    		successCallback(relatorio_workset);
    		console.log("Registro inserido em tb_report_workset");
    	}, (error => {
    		console.log("Erro ao inserir registro em tb_report_workset: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  update(relatorio_workset, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("UPDATE tb_report_workset SET dt_report_workset = ?, series_number = ?, repetitions_number = ?, resting_time = ?, charge = ? WHERE id_report_workset = ?;",
        [relatorio_workset.dt_report_workset, relatorio_workset.series_number, relatorio_workset.repetitions_number, relatorio_workset.resting_time, relatorio_workset.charge, relatorio_workset.id_report_workset]).then((data) => {
    		successCallback(relatorio_workset);
    		console.log("Registro alterado em tb_report_workset");
    	}, (error => {
    		console.log("Erro ao alterar registro em tb_report_workset: " + JSON.stringify(error.err));
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
    	db.executeSql("SELECT *, (SELECT workset_description FROM tb_workset where id = rt.cd_workset) FROM tb_report_workset rt;",[]).then((data) => {
    		let lista = [];
    		for (var i = 0; i < data.rows.length; i++) {
    			lista.push({
            "id_report_workset" : data.rows.item(i).id_report_workset,
            "dt_report_workset" : data.rows.item(i).dt_report_workset,
            "cd_workset" : data.rows.item(i).cd_workset,
            "exercise_id" : data.rows.item(i).exercise_id,
            "series_number" : data.rows.item(i).series_number,
            "repetitions_number" : data.rows.item(i).repetitions_number,
            "resting_time" : data.rows.item(i).resting_time,
            "charge" : data.rows.item(i).charge,
            "workset_description" : data.rows.item(i).workset_description
          });
    		}
    		successCallback(lista);
    		console.log("Registros recuperados em tb_report_workset");
    	}, (error => {
    		console.log("Erro ao recuperar registros em tb_report_workset: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  delete(relatorio_workset, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("DELETE FROM tb_report_workset where id_report_workset = ?;", [relatorio_workset.id_report_workset]).then((data) => {
    		successCallback(relatorio_workset);
    		console.log("Registro excluido de tb_report_workset");
    	}, (error => {
    		console.log("Erro ao excluir registro de tb_report_workset: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }
}
