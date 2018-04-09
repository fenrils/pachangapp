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

  setEvent(params) {
  return this.dataBase.database.ref('events/').push(params);
  }

  updateLikesEvent(likes, event) {
    var userLikes = [];

    if (event.likesUsers) {
      userLikes.push(event.id);
    } else {
      userLikes = [event.id];
    }

    if (event.likesUsers.indexOf(event.id) === -1) {
      event.likes = likes;
      event.likesUsers = userLikes      
      this.dataBase.database.ref('/events/' + event.id)
      .update(event);
      return [event.likesUsers, true]
    } else {
      return [event.likesUsers, false]      
    }
    
  }

}
