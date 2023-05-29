import {Component} from '@angular/core';
import {MenuController} from "@ionic/angular";
import {AuthenticationService} from "./services/authentication.service";
import {NavigationStart, Router} from "@angular/router";
import {User} from "./model/user.model";


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
  ]

  public logout_button = {title: 'Logout', icon: 'log-out'}

  public hideMenuPages = ['/login', '/registration']
  protected user!: Promise<User | undefined>

  constructor(
    private menuController: MenuController,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const shouldHideMenu = this.hideMenuPages.some((page) => event.url.includes(page))
        this.menuController.enable(!shouldHideMenu)
      }
    })
  }

  ngOnInit() {
    this.user = this.authenticationService.getLoggedUser()
  }

  async closeMenu() {
    await this.menuController.close()
  }

  async logout() {
    await this.authenticationService.logout()
  }
}

