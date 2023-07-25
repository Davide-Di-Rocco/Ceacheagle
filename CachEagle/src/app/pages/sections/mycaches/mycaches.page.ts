import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {CacheService} from "../../../services/cache.service";
import {User} from "../../../models/user.model";
import {MyCache} from "../../../models/cache.model";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-mycaches',
  templateUrl: './mycaches.page.html',
  styleUrls: ['./mycaches.page.scss'],
})
export class MycachesPage implements OnInit {

  protected ready = false
  protected loggedUser!: User
  protected cacheList!: MyCache[]

  constructor(
    protected navController: NavController,
    private cacheService: CacheService,
    private authService: AuthenticationService,
  ) {
  }

  async ionViewWillEnter() {
    await this.loadData()
  }

  async ngOnInit() {
    await this.loadData()
    this.ready = true
  }

  async openDetail(id: number) {
    await this.navController.navigateForward(['cacheDetailEdit'], {
      queryParams: {
        id: id
      }
    });
  }

  private async loadData() {
    this.loggedUser = await this.authService.getLoggedUser()
    this.cacheList = await this.cacheService.getUserCaches(this.loggedUser.id)
  }
}
