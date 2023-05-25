import {Component} from '@angular/core';
import {MenuController} from "@ionic/angular";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Cerca', url: 'sections/search', icon: 'search'},
    {title: 'Preferiti', url: 'sections/favorites', icon: 'bookmarks'},
    {title: 'Completate', url: 'sections/completed', icon: 'checkmark-circle'},
    {title: 'Le mie cache', url: 'sections/mycache', icon: 'file-tray-full'},
  ];

  public username: string = ""

  constructor(
    private menuController: MenuController,
    private authenticationService: AuthenticationService
  ) {
    authenticationService.getLoggedUsername().then(m => {
      this.username = m as string
    })
  }

  async closeMenu() {
    await this.menuController.close()
  }
}

