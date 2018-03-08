import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import {AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ModalPage } from '../modal/modal';
import { EventsProvider } from '../../providers/events/events';



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
  eventsConstant: Array<any>;
  //Constructor
  constructor( public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider,public alertCtrl : AlertController, public modalCtrl: ModalController, public events: EventsProvider ) {
      var self = this;
      this.events.getAllEvents().on('value', function(snapshot){
        let value = snapshot.val();
        let keyArr: any[] = Object.keys(value),
        dataArr = [];

        keyArr.forEach((key: any) => {
          dataArr.push(value[key]);
        });
        
        self.eventsTmp = dataArr;
        self.eventsConstant = self.eventsTmp;
      });
 
  }

  //Functions

  

  setEvent() {
    this.navCtrl.push(ModalPage);
  }

  getEvents(searchbar) {
    this.eventsTmp = this.eventsConstant;
    var q = searchbar.srcElement.value;
  
    if (!q) {
      return;
    }
  
    this.eventsTmp = this.eventsTmp.filter((v) => {
      if(v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });  
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

}

