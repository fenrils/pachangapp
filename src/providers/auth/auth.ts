import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { SessionProvider } from '../session/session';
import { PhotoLibrary } from '@ionic-native/photo-library';
import * as firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public userData: any;
  constructor(private afAuth: AngularFireAuth, public dataBase: AngularFireDatabase, public session: SessionProvider, private photoLibrary: PhotoLibrary) {
  }

  registerUser(user: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        this.setUser(user);
        this.readUser(this);
        this.session.setSession(user);
      })
      .catch(err => Promise.reject(err))
  }

  loginUser(email: string, password: string) {
    var self = this;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.session.setSession(user);
        var storage = firebase.storage();
        try {
          storage.ref().child('images/' + user.uid + '.jpg').getDownloadURL().then(function (url) {
            var pic = document.getElementById("circle-pic");
            pic.setAttribute("src", url);            
          });
        } catch (e) {
          console.log(e);
        }

        Promise.resolve(user);
      })
      .catch(err => Promise.reject(err))
  }

  saveToAlbum(url) {
    let album = 'pachangapp';
    var self = this;
    this.photoLibrary.saveImage(url, album).then((entry => {
      self.session.setImageUser(entry.photoURL);
    }),
      (error) => {
        // handle error
      });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
    })
  }

  updateUser(user) {
    this.dataBase.database.ref("user/" + user.id).update(user);
  }

  getAllUsers() {
    return this.dataBase.database.ref("user/");
  }

  get Session() {
    return this.afAuth.authState;
  }

  getUserId() {
    return this.afAuth.auth.currentUser.uid;
  }

  readUser(self) {
    var id = this.getUserId();
    self.dataBase.database.ref('user/').once('value').then((snapshot) => {
      self.getUser(snapshot.val(), self);
    });
  }

  getUser(user: any = null, self): any {
    self.userData = user;
  }

  setUser(user: any) {
    var id = this.getUserId();
    user.id = id;
    return this.dataBase.database.ref('user/').push(user)
  }

}
