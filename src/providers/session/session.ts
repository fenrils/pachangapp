import { Injectable } from '@angular/core';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {
  
  userSession:any;

  constructor() {  
    
  }

  getSession() {
    return this.userSession;
  }

  setSession(session) {
    this.userSession = session;
  }

}
