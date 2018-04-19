import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { NavigatorModelProvider } from '../providers/navigator-model/navigator-model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any;
  public items:any;;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthProvider, public alertCtrl:AlertController, public navigate:NavigatorModelProvider) {
    this.rootPage = LoginPage;    
    this.items = this.navigate.getNavigate();
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
    this.nav.setRoot(item.component);
  }
}

