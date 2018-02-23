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
  eventsTmp = [];
  //Constructor
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,  
    public auth : AuthProvider,
    public alertCtrl : AlertController,
    public modalCtrl: ModalController,
    public events: EventsProvider ) {
      var self = this;
      this.events.getAllEvents().subscribe(data => {
        self.eventsTmp = data;
        console.log(self.eventsTmp);
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
    //datos ha especificar para cada evento
    let eventModal = this.modalCtrl.create(ModalPage);
    eventModal.present();
    /*var params = {
      name: "Nombre Evento",
      date: "12/12/2017",
      description: "Descripcion",
      numpeople: 3,
      typeEvent: 1
    };
    this.events.setEvent(params);*/
    
  }

  getAllEvents() {
    this.events.getAllEvents().subscribe(data => {
      var stringifiedData = JSON.stringify(data);
      this.eventsTmp = JSON.parse(stringifiedData);
      console.log(this.eventsTmp);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

}

