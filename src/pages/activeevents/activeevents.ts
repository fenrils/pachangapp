import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

import { EventsProvider } from '../../providers/events/events';
import { SessionProvider } from '../../providers/session/session';

/**
 * Generated class for the ActiveeventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activeevents',
  templateUrl: 'activeevents.html',
})
export class ActiveeventsPage {
  eventsTmp: Array<any>;
  eventsConstant: Array<any>;
  userSession: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: EventsProvider, public session: SessionProvider) {
    var self = this;
    this.userSession = session.getSession();
    console.log(this.userSession)

    this.events.getAllEvents().on('value', function (snapshot) {

      let value = snapshot.val();
      let keyArr: any[] = Object.keys(value),
        dataArr = [];
      keyArr.forEach((key: any) => {
        try {
          value[key]['id'] = key;
          value[key].users.forEach((item, index) => {
            if (item.id === self.userSession.uid) {
              dataArr.push(value[key]);
            }
          });
          
          console.log(dataArr)
        } catch (error) {
          console.log(error);
        }
      });

      self.eventsTmp = dataArr;
      self.eventsConstant = self.eventsTmp;
    })

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
    console.log('ionViewDidLoad MyeventsPage');
  }

}
