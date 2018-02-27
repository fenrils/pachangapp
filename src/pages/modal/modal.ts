import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { AuthProvider } from '../../providers/auth/auth';



/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  event = {name: '', description: '', date: '', type: ''};
  
  constructor(public auth : AuthProvider, public navCtrl: NavController,public events: EventsProvider, public viewCtrl : ViewController, public navParams: NavParams) {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  addEvent() {
    var params = {
      name: this.event.name,
      date: this.event.date,
      description: this.event.description,
      typeEvent: this.event.type,
      idUser: this.auth.getUserId()
    };
    console.log("PARAMETROS"+ JSON.stringify(params));
    this.events.setEvent(params);
    this.closeModal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
