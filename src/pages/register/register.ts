import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirstPage } from '../first/first';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
// Variables
user = { email : '', password : '', password2 : '', nick : '', age: '', level : '', id : ''};


//Constructor
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth : AuthProvider,
    public alertCtrl : AlertController) {
 }


 //Functions
 signin(){
  this.auth.registerUser(this.user)
  .then((user) => {
    this.navCtrl.push(FirstPage);
  })
  .catch(err=>{
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: err.message,
      buttons: ['Aceptar']
    });
    alert.present();
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
