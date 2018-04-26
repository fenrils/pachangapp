import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ModalPage } from '../modal/modal';
import { DetailPage } from '../detail/detail';

import { EventsProvider } from '../../providers/events/events';
import { SessionProvider } from '../../providers/session/session';

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

  eventsTmp: Array<any>;
  eventsConstant: Array<any>;
  userSession: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public alertCtrl: AlertController, public modalCtrl: ModalController, public events: EventsProvider, public session: SessionProvider) {
    var self = this;
    
      this.events.getAllEvents().on('value', function (snapshot) {
        let value = snapshot.val();
        let keyArr: any[] = Object.keys(value),
          dataArr = [];
        keyArr.forEach((key: any) => {
          try {
            value[key]['id'] = key;
            dataArr.push(value[key]);
            console.log(dataArr);
          } catch (error) {
            console.log(error);
          }
        });

        self.eventsTmp = dataArr;
        self.eventsConstant = self.eventsTmp;
      })
    this.userSession = session.getSession();
  }

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
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  openEvent(event) {
    this.navCtrl.push(DetailPage, event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

}

