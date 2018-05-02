import { Injectable } from '@angular/core';

/*
  Generated class for the NavigatorModelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NavigatorModelProvider {

  items = [{ title: 'Ajustes', component: 'SettingsPage', icon: 'settings' },
    { title: 'Home', component: 'FirstPage', icon: 'home' },
    { title: 'Mis Eventos', component: 'MyeventsPage', icon: 'archive' },
    { title: 'Eventos activos', component: 'ActiveeventsPage', icon: 'bookmarks' }];

  constructor() {
  }

  getNavigate() {
    return this.items;
  }
}
