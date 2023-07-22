import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {CacheService} from "../../../services/cache.service";
import {User} from "../../../models/user.model";
import {MyCache} from "../../../models/cache.model";
import {UserService} from "../../../services/user.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-mycaches',
  templateUrl: './mycaches.page.html',
  styleUrls: ['./mycaches.page.scss'],
})
export class MycachesPage implements OnInit {



  protected loggedUser!: User
  protected cacheList!: MyCache[]

  constructor(
    protected navController: NavController,
    private cacheService: CacheService,
    private authService: AuthenticationService,
  ) {
  }

  async ngOnInit() {
    this.loggedUser = await this.authService.getLoggedUser()
    this.cacheList = await this.cacheService.getUserCaches(this.loggedUser.id)
  }
  async openDetail(id: number) {
    await this.navController.navigateForward(['cacheDetailWithReview'], {
      queryParams: {
        id: id
      }
    });
  }

}
