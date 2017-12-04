import { Component, ViewChild  } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Auth } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;
  @ViewChild('menu') nav: NavController;
  pages: Array<{ title: string, component: any }>;
  //execicio = ExercicioPage;
  //bodyMeasurements = BodyMeasurementsPage;
  //treino = TreinoPage;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sqlite: SQLite, public auth:Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.createBD();

      if(this.auth.isAuthenticated() || platform.is('core')) {
        this.rootPage = "HomePage";
      } else {
        this.rootPage = "LoginPage";
      }
    });
  }

  showMenu() {
    return this.auth.isAuthenticated() || this.platform.is('core');
  }

  public logout() {
    this.auth.logout()
    this.nav.setRoot('LoginPage');
  }

  openPage(option) {
    if (option == 'treino') this.nav.push("WorksetsPage");
    if (option == 'bodyMeasurements') this.nav.push("BodyMeasurementsPage");
    if (option == 'exercicio') this.nav.push("ExercisesPage");
    if (option == 'home') this.nav.push("HomePage");
  }

  createBD() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {

      db.executeSql("CREATE TABLE IF NOT EXISTS tb_body_measurements("+
        " id INTEGER PRIMARY KEY AUTOINCREMENT, body_measurements_date DATE NOT NULL, age INTEGER, height DECIMAL(3,2), weight DECIMAL(3,2), right_arm DECIMAL(3,2), left_arm DECIMAL(3,2), "+
        " left_forearm DECIMAL(3,2), right_forearm DECIMAL(3,2), shoulders DECIMAL(3,2), chest DECIMAL(3,2), right_thigh DECIMAL(3,2), left_thigh DECIMAL(3,2), "+
        " right_calf DECIMAL(3,2), left_calf DECIMAL(3,2), waist DECIMAL(3,2), glutes DECIMAL(3,2) "+
        ");", {})
        .then(() => console.log('Table of Body Measurements created'))
        .catch(e => console.log(e));

      db.executeSql("CREATE TABLE IF NOT EXISTS tb_worksheet(id INTEGER PRIMARY KEY AUTOINCREMENT, worksheet_description TEXT NOT NULL, ativo TEXT DEFAULT 'S');", {})
        .then(() => console.log('Table of exercise created'))
        .catch(e => console.log(e));

      db.executeSql("CREATE TABLE IF NOT EXISTS tb_workset(id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    +" worksheet_id INTEGER NOT NULL, workset_letter TEXT NOT NULL "
                    +" FOREIGN KEY(worksheet_id) REFERENCES tb_worksheet(id)); ", {})
        .then(() => console.log('Table of workset created'))
        .catch(e => console.log(e));

      db.executeSql("CREATE TABLE IF NOT EXISTS tb_exercise(id INTEGER PRIMARY KEY AUTOINCREMENT, "
                    +" exercise TEXT NOT NULL, description TEXT, main_muscle TEXT, other_muscles TEXT, video_link TEXT);", {})
        .then(() => console.log('Table of exercise created'))
        .catch(e => console.log(e));

      db.executeSql("CREATE TABLE IF NOT EXISTS tb_workset_exercise("+
                    " id INTEGER PRIMARY KEY AUTOINCREMENT, workset_id INTEGER NOT NULL, "
                    +" exercise_id INTEGER NOT NULL, series_number INTEGER NOT NULL, "
                    +" repetitions_number INTEGER NOT NULL, resting_time TEXT, "
                    +" charge TEXT, charge_unit TEXT, FOREIGN KEY(workset_id) REFERENCES tb_workset(id), FOREIGN KEY(exercise_id) REFERENCES tb_exercise(id));", {})
        .then(() => console.log('Table of workset exercises created'))
        .catch(e => console.log(e));

      /*db.executeSql("CREATE TABLE IF NOT EXISTS tb_report_workset(id_report_workset INTEGER PRIMARY KEY AUTOINCREMENT, dt_report_workset DATE NOT NULL, workset_id INTEGER NOT NULL, exercise_id INTEGER NOT NULL, "+
                    "series_number INTEGER NOT NULL, repetitions_number INTEGER NOT NULL, resting_time DECIMAL(2,1), charge DECIMAL(4,1), "+
                    "FOREIGN KEY(workset_id) REFERENCES tb_workset(id), FOREIGN KEY(exercise_id) REFERENCES tb_exercise(id));", {})
        .then(() => console.log('Table of workset report created'))
        .catch(e => console.log(e));*/
    })
    .catch(e => console.log("erro ao criar tabelas"));
  }
}
