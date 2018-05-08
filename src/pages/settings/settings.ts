import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { MyApp } from '../../app/app.component';
import * as firebase from 'firebase';
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
  selectedPhoto;
  usersConstant = { age: "", email: "", id: "", level: "", nick: "", password: "" };
  userSession: any;
  loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public auth: AuthProvider, public session: SessionProvider, loadingCtrl: LoadingController, public app: MyApp) {
    var self = this;
    this.userSession = session.getSession();
    this.getPic();
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
    });
  }

  ionViewDidLoad() {

  }

  getPic(){
    var self = this;
    var storage = firebase.storage();
    try {
      storage.ref().child('images/' + this.userSession.uid + '.jpg').getDownloadURL().then(function (url) {
        self.currentPhoto = url;            
      });
    } catch (error) {
      console.log(error);
    }

  }

  getPhoto(type) {
    var self = this;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,

      // sourceType: type == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((file_uri) => {

      this.selectedPhoto = self.dataURItoBlob('data:image/jpeg;base64,' + file_uri);;
      var imageRef = firebase.storage().ref().child('images/' + this.userSession.uid +'.jpg').put(self.selectedPhoto);
      imageRef.then(self.onSuccess, self.onError);

    }, (err) => {
      // Handle error
    });

  }

  saveUpdate() {
    this.auth.updateUser(this.usersConstant);
  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  onSuccess = (snapshot) => {
    this.currentPhoto = snapshot.downloadURL;
    var pic = document.getElementById("circle-pic");
    pic.setAttribute("src", snapshot.downloadURL);                
    this.userSession.setImageUser(this.currentPhoto);
    this.app.userImage = snapshot.downloadURL;
  }

  onError = (error) => {
    console.log('error', error);
  }

  goBack() {
    this.navCtrl.setRoot(FirstPage);
  }

}
