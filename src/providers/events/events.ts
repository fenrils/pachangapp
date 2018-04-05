import { Injectable } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { useAnimation } from '@angular/core/src/animation/dsl';


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

  updateLikesEvent(likes, userLikes: Array<any>, id: string) {
    if (userLikes) {
      userLikes.push(this.auth.getUserId());
    } else {
      userLikes = [id];
    }
    if (userLikes.indexOf(id) < 0) {
      this.dataBase.database.ref('/events/' + id)
      .update({ likes: likes, likesUsers: userLikes });

      return [userLikes, true]
    } 
  }

}
