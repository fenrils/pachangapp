import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { GoogleMaps } from '@ionic-native/google-maps';
// Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FirstPage } from '../pages/first/first';
import { RegisterPage } from '../pages/register/register';
import { ModalPage } from '../pages/modal/modal';
import { DetailPage } from '../pages/detail/detail';
import { RoomPage } from '../pages/room/room';
import { MyeventsPage } from '../pages/myevents/myevents';
import { ActiveeventsPage } from '../pages/activeevents/activeevents';
import { SettingsPage } from '../pages/settings/settings'; 
import { SettingsPageModule } from '../pages/settings/settings.module';

//Providers
import { AuthProvider } from '../providers/auth/auth';
import { EventsProvider } from '../providers/events/events';
import { NavigatorModelProvider } from '../providers/navigator-model/navigator-model';
import { SessionProvider } from '../providers/session/session';
import { FirstPageModule } from '../pages/first/first.module';
import { MyeventsPageModule } from '../pages/myevents/myevents.module';
import { ActiveeventsPageModule } from '../pages/activeevents/activeevents.module';
import {Camera} from "@ionic-native/camera";
//Token Firebase (Backend)
export const firebaseConfig = {
  apiKey: "AIzaSyB8GEPYw1Fvvu-L2GsMaJShNVGk-ZTks34",
  authDomain: "pachangapp-a8ccc.firebaseapp.com",
  databaseURL: "https://pachangapp-a8ccc.firebaseio.com",
  projectId: "pachangapp-a8ccc",
  storageBucket: "pachangapp-a8ccc.appspot.com",
  messagingSenderId: "401488245465"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ModalPage,
    DetailPage,
    RoomPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FirstPageModule,
    MyeventsPageModule,
    ActiveeventsPageModule,
    SettingsPageModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    FirstPage,
    RegisterPage,
    ModalPage,
    DetailPage,
    RoomPage,
    MyeventsPage,
    ActiveeventsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    EventsProvider,
    NavigatorModelProvider,
    SessionProvider,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
