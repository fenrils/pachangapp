import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {

  //Variables

  //Constructor
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public auth : AuthProvider,
    public alertCtrl : AlertController) {
 
  }

  //Functions

  //Go to page Login
  login(){
    this.navCtrl.push(LoginPage);

  }

  //Go to page Register
  register(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

}
