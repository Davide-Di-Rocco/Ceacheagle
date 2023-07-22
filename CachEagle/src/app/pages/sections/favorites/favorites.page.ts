import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../../services/cache.service";
import {MyCache} from "../../../models/cache.model";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../models/user.model";
import {NavController} from "@ionic/angular";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  protected cachesList!: MyCache[]
  private loggedUser!: User

  constructor(
    private navController: NavController,
    private cacheService: CacheService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
  }

  async ngOnInit() {
    this.loggedUser = await this.authService.getLoggedUser()
    this.cachesList = await this.cacheService.getFavoritesCaches(this.loggedUser.favorites)
  }

  async openDetail(id: number) {
    await this.navController.navigateForward(['cacheDetailWithReview'], {
      queryParams: {
        id: id
      }
    });
  }

  async removeFavorite(id: number) {
    await this.userService.editFavorite(id)
    let index = -1;
    for (let i = 0; i < this.cachesList.length; i++) {
      const c = this.cachesList[i]
      if (c.id == id) {
        index = i
        break
      }
    }
    if (index !== -1) {
      this.cachesList.splice(index, 1);
    }
  }
}
