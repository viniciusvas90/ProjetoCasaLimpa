import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';

import { MyApp } from './app.component';
import { DiaristasProvider } from '../providers/diaristas/diaristas';
import { UsersProvider } from '../providers/users/users';
import { ClientesProvider } from '../providers/clientes/clientes';
import { ClientesImoveisCadastroPage } from "../pages/clientes-imoveis-cadastro/clientes-imoveis-cadastro";
import { OptionsComponent } from "../components/options/options";
import { UtilsProvider } from '../providers/utils/utils';

@NgModule({
  declarations: [
    MyApp,
    ClientesImoveisCadastroPage,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ClientesImoveisCadastroPage,
    OptionsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DiaristasProvider,
    UsersProvider,
    UtilsProvider,
    DatePipe,
    ClientesProvider
  ]
})
export class AppModule {}
