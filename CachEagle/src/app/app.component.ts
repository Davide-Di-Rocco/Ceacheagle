import {Component} from '@angular/core';
import {MenuController} from "@ionic/angular";
import {AuthenticationService} from "./services/authentication.service";
import {User} from "./models/user.model";

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
    {title: 'Le mie cache', url: 'sections/mycaches', icon: 'file-tray-full'},
  ]

  public logout_button = {title: 'Logout', icon: 'log-out'}
  protected user!: Promise<User | undefined>

  constructor(
    private menuController: MenuController,
    private authenticationService: AuthenticationService
  ) {
  }

  async closeMenu() {
    await this.menuController.close()
  }

  async logout() {
    await this.authenticationService.logout()
  }

  setUser() {
    this.user = this.authenticationService.getLoggedUser()
  }
}
