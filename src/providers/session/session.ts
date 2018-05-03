import { Injectable } from '@angular/core';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {
  
  userSession:any;
  imageUser;

  constructor() {  
    
  }

  getSession() {
    return this.userSession;
  }

  getImageUser() {
    return this.imageUser;
  }

  setImageUser(image) {
    this.imageUser = image;
  }

  setSession(session) {
    this.userSession = session;
  }

}
