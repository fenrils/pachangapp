import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import {AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { ModalPage } from '../modal/modal';

import { EventsProvider } from '../../providers/events/events';
import { Observable } from 'rxjs/Observable';


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
  eventsTmp: Array<any>;
  //Constructor
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public auth : AuthProvider,
    public alertCtrl : AlertController,
    public modalCtrl: ModalController,
    public events: EventsProvider ) {
      var self = this;
      this.events.getAllEvents().on('value', function(snapshot){
        let value = snapshot.val();
        let keyArr: any[] = Object.keys(value),
        dataArr = [];

      keyArr.forEach((key: any) => {
        dataArr.push(value[key]);
      });
        self.eventsTmp = dataArr;
      });
 
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

  //Pruebas Mock para guardar eventos y recogerlos desde un observer conectad a firebase

  setEvent() {
    let eventModal = this.modalCtrl.create(ModalPage);
    eventModal.present();
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

}

