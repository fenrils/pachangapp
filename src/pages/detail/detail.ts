import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, LatLng } from '@ionic-native/google-maps';
import { EventsProvider } from '../../providers/events/events';

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


  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, public navParams: NavParams, public events: EventsProvider) {
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
    this.event.data.likes = like;
    this.events.updateLikesEvent(like, this.event.data.id);
  }


}
