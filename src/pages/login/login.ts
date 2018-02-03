import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Variables
  user = { email : '', password : ''};

  //Constructor
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public auth : AuthProvider,
     public alertCtrl : AlertController) {
  }

 
  //Functions

  //Pick user and password from form and check if is in DB
  login()
    {
      this.auth.loginUser(this.user.email,this.user.password ).then((user) => { console.log(user) })
      .catch(err=>{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
    })
  }

  //Redirects to register page
  register(){
    this.navCtrl.push(RegisterPage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
