import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AuthProvider } from '../../providers/auth/auth';
import { SessionProvider } from '../../providers/session/session';
import { FirstPage } from '../first/first';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  currentPhoto = "assets/imgs/avatar-han.png";
  usersConstant = { age: "", email: "", id: "", level: "", nick: "", password: "" };
  userSession: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public auth: AuthProvider, public session: SessionProvider) {
    var self = this;
    this.userSession = session.getSession();
    this.auth.getAllUsers().on('value', function (snapshot) {
      let value = snapshot.val();
      let keyArr: any[] = Object.keys(value),
        dataArr = [];
      keyArr.forEach((key: any) => {
        try {
          if (value[key].id === self.userSession.uid) {
            self.usersConstant = value[key];
          }
        } catch (error) {
        }
      });
      console.log(self.usersConstant)
    });
  }

  getPhoto(type) {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,

      // sourceType: type == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((file_uri) => {

      this.currentPhoto = file_uri;
      console.log(this.currentPhoto);

    }, (err) => {
      // Handle error
    });
  }

  goBack() {
    this.navCtrl.setRoot(FirstPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
