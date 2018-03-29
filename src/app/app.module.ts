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


//Providers
import { AuthProvider } from '../providers/auth/auth';
import { EventsProvider } from '../providers/events/events';

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
    FirstPage,
    RegisterPage,
    ModalPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
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
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    EventsProvider
  ]
})
export class AppModule {}
