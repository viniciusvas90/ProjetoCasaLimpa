//https://www.sqlite.org/lang_createtable.html
//https://www.thepolyglotdeveloper.com/2016/08/using-sqlstorage-instead-sqlite-ionic-2-app/
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { connection } from './connection';

export class daoExercise {
  private sqlite: SQLite;
  private con: connection;
  constructor() {
    this.sqlite = new SQLite();
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
  }

  autoInsert() {
    this.openDB()
    .then((db: SQLiteObject) => {
    	db.executeSql("SELECT count(*) as existe FROM tb_exercise;",[]).then((data) => {
    		let existe = data.rows.item(0).existe;
        console.log("existe: "+existe);
        if (existe == 0) {
          db.executeSql("INSERT INTO tb_exercise(exercise, description, main_muscle, other_muscles) "
                        +" VALUES ('SUPINO RETO','Utilizando uma barra reta em torno de 1,5m, deite num banco reto e com uma pegada um pouco mais larga que os ombros, empurre a barra controladamente para cima, descendo em seguida.',"
                        +"'PEITORAL','OMBRO, TRÍCEPS');",[]);
          db.executeSql("INSERT INTO tb_exercise(exercise, description, main_muscle, other_muscles) "
                        +" VALUES ('ROSCA DIRETA','',"
                        +"'BÍCEPS','ANTEBRAÇO');",[]);
          db.executeSql("INSERT INTO tb_exercise(exercise, description, main_muscle) "
                        +" VALUES ('TRÍCEPS TESTA','Deitado num banco reto, segure uma barra no alto com os braços esticados. Flexione os antebraços descendo até as mãos aproximarem da testa.',"
                        +"'TRÍCEPS');",[]);
          db.executeSql("INSERT INTO tb_exercise(exercise, description, main_muscle, other_muscles) "
                        +" VALUES ('REMADA CURVADA','Com os joelhos levemente flexionados, incline o corpo sobre o eixo do quadril até aproximadamente 90 graus, pegue uma barra no chão e a puxe flexionando os braços até tocar entre o peito e o abdômen',"
                        +"'COSTAS','BÍCEPS, ANTEBRAÇO');",[]);
          console.log("Registros inseridos automaticamente em tb_exercise");
        }
    	}, (error => {
    		console.log("Erro ao recuperar registros em tb_exercise: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  insert(exercicio, successCallback) {
    this.openDB()
    .then((db: SQLiteObject) => {
    	db.executeSql("INSERT INTO tb_exercise(exercise, description, main_muscle, other_muscles, video_link) VALUES (?,?,?,?,?);",
                    [exercicio.exercise,exercicio.description,exercicio.main_muscle,exercicio.other_muscles,exercicio.video_link]).then((data) => {
    		exercicio.id = data.insertId;
    		successCallback(exercicio);
    		console.log("Registro inserido em tb_exercise");
    	}, (error => {
    		console.log("Erro ao inserir registro em tb_exercise: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  update(exercicio, successCallback) {
    this.openDB()
    .then((db: SQLiteObject) => {
    	db.executeSql("UPDATE tb_exercise SET exercise = ?, description = ? WHERE id = ?;", [exercicio.exercise, exercicio.description, exercicio.id]).then((data) => {
    		successCallback(exercicio);
    		console.log("Registro alterado em tb_exercise: "+ exercicio.id + "-" + exercicio.exercise);
    	}, (error => {
    		console.log("Erro ao alterar registro em tb_exercise: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  //delete(exercicio, successCallback) {
  delete(exercicio) {
    this.openDB()
    .then((db: SQLiteObject) => {
    	db.executeSql("DELETE FROM tb_exercise where id = ?;", [exercicio.id]).then((data) => {
    		//successCallback(exercicio);
    		console.log("Registro excluido de tb_exercise");
    	}, (error => {
    		console.log("Erro ao excluir registro de tb_exercise: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log(e));
  }

  openDB() {
    return new Promise((resolve, reject) => {
      console.log("openDB");
      this.sqlite = new SQLite();
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((dataBase: SQLiteObject) => {
        resolve(dataBase);
      }).catch(e => reject(console.log("erro ao abrir o banco: "+e)));
    });
  }

  getList(successCallback) {
    this.openDB()
    .then((db: any) => {
    	db.executeSql("SELECT * FROM tb_exercise order by exercise;",[]).then((data) => {
        console.log("getList");
    		let lista = [];
    		for (var i = 0; i < data.rows.length; i++) {
    			lista.push({
            "id": data.rows.item(i).id,
            "exercise": data.rows.item(i).exercise,
            "description": data.rows.item(i).description,
            "main_muscle": data.rows.item(i).main_muscle,
            "other_muscles": data.rows.item(i).other_muscles,
            "video_link": data.rows.item(i).video_link
          });
    		}
    		successCallback(lista);
    		console.log("Registros recuperados em tb_exercise");
    	}, (error => {
    		console.log("Erro ao recuperar registros em tb_exercise: " + JSON.stringify(error.err));
    	}));
    })
    .catch(e => console.log("erro ao abrir banco"));
  }
}
