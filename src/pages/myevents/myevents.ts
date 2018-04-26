import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { SessionProvider } from '../../providers/session/session';
/**
 * Generated class for the MyeventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myevents',
  templateUrl: 'myevents.html',
})
export class MyeventsPage {

  eventsTmp: Array<any>;
  eventsConstant: Array<any>;
  userSession: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: EventsProvider, public session: SessionProvider) {
    var self = this;
    
      this.events.getAllEvents().on('value', function (snapshot) {
        let value = snapshot.val();
        let keyArr: any[] = Object.keys(value),
          dataArr = [];
        keyArr.forEach((key: any) => {
          try {
            value[key]['id'] = key;
            dataArr.push(value[key]);
          } catch (error) {
          }
        });

        self.eventsTmp = dataArr;
        self.eventsConstant = self.eventsTmp;
      })
    this.userSession = session.getSession();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyeventsPage');
  }

}
