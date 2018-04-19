import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})

export class RoomPage {
  @ViewChild(Content) content: Content;
  data = { type: '', nickname: '', message: '' };
  chats = [];
  userNick: string;
  roomkey: string;
  nickname: string;
  offStatus: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataBase: AngularFireDatabase) {
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickName") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;

    let joinData = dataBase.database.ref('chatrooms/' + this.roomkey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.nickname,
      message: this.nickname + ' has joined this room.',
      sendDate: Date()
    });
    this.data.message = '';

    dataBase.database.ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  sendMessage() {
    let newData = this.dataBase.database.ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.data.message,
      sendDate: Date()
    });
    this.data.message = '';
  }

  exitChat() {
    let exitData = this.dataBase.database.ref('chatrooms/' + this.roomkey + '/chats').push();
    exitData.set({
      type: 'exit',
      user: this.nickname,
      message: this.nickname + ' has exited this room.',
      sendDate: Date()
    });

    this.offStatus = true;

    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    //item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};