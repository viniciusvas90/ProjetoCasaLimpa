//https://www.sqlite.org/lang_createtable.html
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

export class daoBodyMeasurements {
  private sqlite: SQLite;
  constructor() {
    this.sqlite = new SQLite();
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
  }

  insert(body_measurements, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO tb_body_measurements("+
        " body_measurements_date, age, height, weight, right_arm, left_arm, left_forearm, right_forearm, shoulders, chest, right_thigh, left_thigh, right_calf, left_calf, waist, glutes) "+
        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);", [body_measurements.body_measurements_date, body_measurements.age, body_measurements.height, body_measurements.weight, body_measurements.right_arm,
        body_measurements.left_arm, body_measurements.left_forearm, body_measurements.right_forearm, body_measurements.shoulders, body_measurements.chest, body_measurements.right_thigh,
        body_measurements.left_thigh, body_measurements.right_calf, body_measurements.left_calf, body_measurements.waist, body_measurements.glutes])
        .then((data) => {
      		body_measurements.id = data.insertId;
      		console.log("Inserted item in tb_body_measurements");
      		successCallback(body_measurements);
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  update(body_measurements, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql("UPDATE tb_body_measurements SET body_measurements_date = ? WHERE id = ?;", [body_measurements.body_measurements_date, body_measurements.id])
        .then((data) => {
      		body_measurements.id = data.insertId;
      		console.log("Updated item in tb_body_measurements");
      		successCallback(body_measurements);
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  getList(successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql("SELECT * FROM tb_body_measurements;",[]).then((data) => {
    		let lista = [];
    		for (var i = 0; i < data.rows.length; i++) {
          lista.push({
            "id" : data.rows.item(i).id,
            "body_measurements_date" : data.rows.item(i).body_measurements_date,
            "age" : data.rows.item(i).age,
            "height" : data.rows.item(i).height,
            "weight" : data.rows.item(i).weight,
            "right_arm" : data.rows.item(i).right_arm,
            "left_arm" : data.rows.item(i).left_arm,
            "left_forearm" : data.rows.item(i).left_forearm,
            "right_forearm" : data.rows.item(i).right_forearm,
            "shoulders" : data.rows.item(i).shoulders,
            "chest" : data.rows.item(i).chest,
            "right_thigh" : data.rows.item(i).right_thigh,
            "left_thigh" : data.rows.item(i).left_thigh,
            "right_calf" : data.rows.item(i).right_calf,
            "left_calf" : data.rows.item(i).left_calf,
            "waist" : data.rows.item(i).waist,
            "glutes" : data.rows.item(i).glutes
          });
    		}
    		successCallback(lista);
    		console.log("Registros recuperados em tb_body_measurements");
    	}, (error => {
    		console.log("Erro ao recuperar registros em tb_body_measurements: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  getUltimaBodyMeasurements(successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("SELECT * FROM tb_body_measurements order by body_measurements_date desc limit 1;",[]).then((data) => {
    		let body_measurements = {};
    		if (data.rows.length > 0) {
          body_measurements = {
            "id" : data.rows.item(0).id,
            "body_measurements_date" : data.rows.item(0).body_measurements_date,
            "age" : data.rows.item(0).age,
            "height" : data.rows.item(0).height,
            "weight" : data.rows.item(0).weight,
            "right_arm" : data.rows.item(0).right_arm,
            "left_arm" : data.rows.item(0).left_arm,
            "left_forearm" : data.rows.item(0).left_forearm,
            "right_forearm" : data.rows.item(0).right_forearm,
            "shoulders" : data.rows.item(0).shoulders,
            "chest" : data.rows.item(0).chest,
            "right_thigh" : data.rows.item(0).right_thigh,
            "left_thigh" : data.rows.item(0).left_thigh,
            "right_calf" : data.rows.item(0).right_calf,
            "left_calf" : data.rows.item(0).left_calf,
            "waist" : data.rows.item(0).waist,
            "glutes" : data.rows.item(0).glutes
          };
    		} else {
          /*body_measurements = {
            "id" : "Sem dados",
            "body_measurements_date" : "Sem dados",
            "height" : "Sem dados",
            "weight" : "Sem dados",
            "right_arm" : "Sem dados",
            "left_arm" : "Sem dados",
            "left_forearm" : "Sem dados",
            "right_forearm" : "Sem dados",
            "shoulders" : "Sem dados",
            "chest" : "Sem dados",
            "right_thigh" : "Sem dados",
            "left_thigh" : "Sem dados",
            "right_calf" : "Sem dados",
            "left_calf" : "Sem dados",
            "waist" : "Sem dados"
          };*/
        }
    		successCallback(body_measurements);
    		console.log("Avaliação recuperada em tb_body_measurements");
    	}, (error => {
    		console.log("Erro ao recuperar registro em tb_body_measurements: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  delete(body_measurements, successCallback) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
    	db.executeSql("DELETE FROM tb_body_measurements where id = ?;", [body_measurements.id]).then((data) => {
    		successCallback(body_measurements);
    		console.log("Registro excluido de tb_body_measurements");
    	}, (error => {
    		console.log("Erro ao excluir registro de tb_body_measurements: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }
}
