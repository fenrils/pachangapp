import { Injectable } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';


/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {

  constructor(public auth : AuthProvider, public dataBase: AngularFireDatabase) {

  }

  getAllEvents() {
      return this.dataBase.database.ref("events/");

  }

  getEventsUser() {

  }

  getEventFromId() {

  }

  setEvent(params) {
  return this.dataBase.database.ref('events/').push(params);
  }

  updateLikesEvent(likes, id) {
    this.dataBase.database.ref().child('/events/' + id)
    .set({ likes: likes});

  }

}
