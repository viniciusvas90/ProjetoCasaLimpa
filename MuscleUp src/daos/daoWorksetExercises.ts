//https://www.sqlite.org/lang_createtable.html
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class daoWorksetExercises {
  private sqlite: SQLite;
  constructor() {
    this.sqlite = new SQLite();
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
  }

  insert(treino_exercise) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("INSERT INTO tb_workset_exercise(workset_id, exercise_id, series_number, repetitions_number, resting_time, charge, charge_unit) VALUES (?,?,?,?,?,?,?);",
                    [treino_exercise.workset_id, treino_exercise.exercise_id, treino_exercise.series_number, treino_exercise.repetitions_number, treino_exercise.resting_time, treino_exercise.charge, treino_exercise.charge_unit]).then((data) => {
    		treino_exercise.id = data.insertId;
    		console.log("Registro inserido em tb_workset_exercise");
    	}, (error => {
    		console.log("Erro ao inserir registro em tb_workset_exercise: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  update(treino_exercise, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("UPDATE tb_workset_exercise SET series_number = ?, repetitions_number = ?, resting_time = ?, charge = ?, charge_unit = ? WHERE id = ?;",
                    [treino_exercise.series_number, treino_exercise.repetitions_number, treino_exercise.resting_time, treino_exercise.charge, treino_exercise.charge_unit, treino_exercise.id]).then((data) => {
    		successCallback(treino_exercise);
    		console.log("Registro alterado em tb_workset_exercise");
    	}, (error => {
    		console.log("Erro ao alterar registro em tb_workset_exercise: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  getList(workset_id, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("SELECT *, (SELECT exercise FROM tb_exercise where id = te.exercise_id) as exercise FROM tb_workset_exercise te where workset_id = ?;", [workset_id]).then((data) => {
    		let lista = [];
    		for (var i = 0; i < data.rows.length; i++) {
          lista.push({
            "id" : data.rows.item(i).id,
            "series_number" : data.rows.item(i).series_number,
            "repetitions_number" : data.rows.item(i).repetitions_number,
            "resting_time" : data.rows.item(i).resting_time,
            "charge" : data.rows.item(i).charge,
            "charge_unit" : data.rows.item(i).charge_unit,
            "workset_id" : data.rows.item(i).workset_id,
            "exercise_id" : data.rows.item(i).exercise_id,
            "exercise" : data.rows.item(i).exercise
          });
    		}
    		successCallback(lista);
    		console.log("Registros recuperados em tb_workset_exercise");
    	}, (error => {
    		console.log("Erro ao recuperar registros em tb_workset_exercise: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  delete(treino_exercise, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("DELETE FROM tb_workset_exercise where id = ?;", [treino_exercise.id]).then((data) => {
    		successCallback(treino_exercise);
    		console.log("Registro excluido de tb_workset_exercise");
    	}, (error => {
    		console.log("Erro ao excluir registro de tb_workset_exercise: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }
}
