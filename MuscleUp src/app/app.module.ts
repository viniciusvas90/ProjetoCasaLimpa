import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { ModalNewExercisePage } from '../pages/modal-new-exercise/modal-new-exercise';
import { ModalNewWorksetPage } from '../pages/modal-new-workset/modal-new-workset';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '1ab71143'
  }
};

@NgModule({
  declarations: [
    MyApp,
    ModalNewExercisePage,
    ModalNewWorksetPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalNewExercisePage,
    ModalNewWorksetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
