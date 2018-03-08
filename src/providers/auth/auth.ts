import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public userData: any;
  constructor(private afAuth :  AngularFireAuth, public dataBase: AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
  }

      // Registro de usuario
  registerUser(user: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .then((res)=> {
         // El usuario se ha creado correctamente.
         this.setUser(user);
         this.readUser(this);
      })
      .catch(err=>Promise.reject(err))
    }
   // Login de usuario
  loginUser(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user=>Promise.resolve(user))
      .catch(err=>Promise.reject(err))
  }
  // Getters
  get Session() {
    return this.afAuth.authState;
  }

  getUserId() {
    return this.afAuth.auth.currentUser.uid;
  }

  readUser(self) {
    var id = this.getUserId();
    self.dataBase.database.ref('user/').once('value').then((snapshot) =>{
      self.getUser(snapshot.val(), self);
    });
  }

  getUser(user: any = null, self): any {
    self.userData = user;
  }
 //Seters
 setUser(user: any) {
  var id = this.getUserId();
  user.id = id;
  return this.dataBase.database.ref('user/').push(user)
}

   // Logout de usuario
  logout() {
    this.afAuth.auth.signOut().then(()=>{
    })
  }

  getAllUsers() {
      return this.dataBase.database.ref("user/");
  }


}
