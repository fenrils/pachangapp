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
    var chatId = this.idGenerator();
    var paramsChat = {
      chats: {
        type: "",
        user: "",
        message: "",
        sendDate: ""
      }
    }
    this.dataBase.database.ref('chatrooms/').child(chatId).set(paramsChat); 
    params['chatRoom'] = chatId;
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

  idGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}

aliasGenerator() {
  var S4 = function() {
     return (((1+Math.random())*0x10000)|0).toString(5).substring(1);
  };
  return (S4());
}

}
