import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, LatLng } from '@ionic-native/google-maps';
import { EventsProvider } from '../../providers/events/events';
import { AuthProvider } from '../../providers/auth/auth';
import { RoomPage } from '../room/room';
import { FirstPage } from '../first/first';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  map: GoogleMap;
  event: any;
  usersList: Array<any>;


  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider, public events: EventsProvider) {
    this.event = this.navParams;    
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.getPosition();
      });
  }

  getPosition(): void {
    this.map.moveCamera({
      target: this.event.data.latLng
    });
    this.map.addMarker({
      title: 'Aqui sera el evento!!',
      icon: 'blue',
      animation: 'DROP',
      position: this.event.data.latLng
    });
  }

  setLikeEvent() {
    var like = this.event.data.likes + 1;
    var returnLike = this.events.updateLikesEvent(like, this.event.data);
    if (returnLike[1]) {
      this.event.data.likes = like;
      this.event.data.likesUsers = returnLike[0];
    }
  }

  ChatRoom() {
    var nick = this.events.aliasGenerator();
    this.navCtrl.push(RoomPage, { 
      nickName: nick,
      key: this.event.data.chatRoom 
    });
  }

  goBack() {
    this.navCtrl.setRoot(FirstPage);
   }
}
