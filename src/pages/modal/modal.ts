import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { AuthProvider } from '../../providers/auth/auth';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, LatLng } from '@ionic-native/google-maps';
import { FirstPage } from '../first/first';


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
  
  event = { 
    name: '',
    description: '', 
    date: '', 
    type: '', 
    duration: '', 
    users: [], 
    latlng: [],
    likes: 0,
    likesUsers: ""
  };

  users = [];
  userIds = [];
  map: GoogleMap;
  usersTmp: Array<any>;
  usersConstant: Array<any>;
  inSearch: boolean = false;

  constructor(private googleMaps: GoogleMaps, public auth: AuthProvider, public navCtrl: NavController, public events: EventsProvider, public viewCtrl: ViewController, public navParams: NavParams) {
    var self = this;
    this.auth.getAllUsers().on('value', function (snapshot) {
      let value = snapshot.val();
      let keyArr: any[] = Object.keys(value),
        dataArr = [];
      keyArr.forEach((key: any) => {
        dataArr.push(value[key]);
      });
      self.usersConstant = dataArr;
    });
  }

  ionViewDidLoad() {
    this.loadMap()
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  getEvents(searchbar) {
    this.usersTmp = this.usersConstant;
    var q = searchbar.srcElement.value;
    if (!q) {
      return;
    }
    this.usersTmp = this.usersTmp.filter((v) => {
      if (v.nick && q.charAt(0) === '@' && q.length > 2) {
        var k = q.substr(1);
        if (v.nick.toLowerCase().indexOf(k.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  addParticipant(user) {

    if (this.userIds.indexOf(user.id) <= -1) {
      console.log('entro');
      this.users.push({
        'id': user.id,
        'nick': user.nick,
        'email': user.email
      });
      this.event.users = this.users;
      this.userIds.push(user.id);
    }
  }

  addEvent() {
    var params = {
      name: this.event.name,
      date: this.event.date,
      description: this.event.description,
      duration: this.event.duration,
      typeEvent: this.event.type,
      idUser: this.auth.getUserId(),
      users: this.event.users,
      totalUsers: this.event.users.length,
      latLng: this.event.latlng,
      likes: 0,
      likesUsers: ""
    };
    this.events.setEvent(params);
    this.navCtrl.push(FirstPage);
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
        this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
          (data) => {
            this.event.latlng = data[0];
            this.getPositionClick(data[0]);
          }
        );
      });
  }

  getPosition(): void {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'Tu estas aqui!!',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getPositionClick(params): void {
        console.log(params)
        this.map.clear();
         this.map.addMarker({
          title: 'El evento sera aqui!!',
          icon: 'red',
          animation: 'DROP',
          position: params
        });
  }

}
