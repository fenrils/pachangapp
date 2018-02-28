import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
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
  event = { name: '', description: '', date: '', type: '', duration: '' };
  map: GoogleMap;

  constructor(public auth: AuthProvider, public navCtrl: NavController, public events: EventsProvider, private googleMaps: GoogleMaps, public viewCtrl: ViewController, public navParams: NavParams) {

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  addEvent() {
    var params = {
      name: this.event.name,
      date: this.event.date,
      description: this.event.description,
      duration: this.event.duration,
      typeEvent: this.event.type,
      idUser: this.auth.getUserId()
    };
    this.events.setEvent(params);
    this.closeModal();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        this.getPosition();
      })
      .catch(error => {
        console.log(error);
      });

  }

  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'My Position',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  ionViewDidLoad() {
    this.loadMap();
  }

}
