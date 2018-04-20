import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { NavigatorModelProvider } from '../providers/navigator-model/navigator-model';

// Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FirstPage } from '../pages/first/first';
import { RegisterPage } from '../pages/register/register';
import { ModalPage } from '../pages/modal/modal';
import { DetailPage } from '../pages/detail/detail';
import { RoomPage } from '../pages/room/room';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any;
  public items:any;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthProvider, public alertCtrl:AlertController, public navigate:NavigatorModelProvider) {
    this.rootPage = LoginPage;    
    this.items = this.navigate.getNavigate();
    console.log(this.items );
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.auth.Session.subscribe(session=>{
        if(!session){
            this.rootPage = LoginPage;
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  navigateTo(item) {
    console.log(JSON.stringify(item.component));
    this.nav.setRoot(item.component);
  }
}

