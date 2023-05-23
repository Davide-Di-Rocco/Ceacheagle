import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Cerca', url: '/pages/sections/search', icon: 'search'},
    {title: 'Preferiti', url: '/pages/sections/outbox', icon: 'bookmarks'},
    {title: 'Completate', url: '/pages/sections/favorites', icon: 'checkmark-done-circle'},
    {title: 'Le mie cache', url: '/pages/folder/archived', icon: 'file-tray-full'},
  ];

  protected username: string
  constructor() {
    this.username = "Pippo"
  }
}
