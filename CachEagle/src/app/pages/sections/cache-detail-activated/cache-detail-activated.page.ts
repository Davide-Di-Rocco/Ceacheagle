import {Component, OnInit} from '@angular/core';
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {CacheService} from "../../../services/cache.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {MyCache} from "../../../models/cache.model";
import {User} from "../../../models/user.model";
import {Preferences} from "@capacitor/preferences";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-cache-detail-activated',
  templateUrl: './cache-detail-activated.page.html',
  styleUrls: ['./cache-detail-activated.page.scss'],
})
export class CacheDetailActivatedPage implements OnInit {
  protected readonly ColorSchemaType = ColorSchemaType;
  protected cache!: MyCache
  protected user!: User
  protected ready: boolean = false
  protected showMap: boolean = false

  constructor(
    private cacheService: CacheService,
    private authService: AuthenticationService,
    private navController: NavController
  ) {

  }

  ngOnInit() {
    console.log("SONO QUI")
    Preferences.get({key: 'active'}).then(async value => {
      console.log(value)
      if (typeof value.value === "string") {
        const id = parseInt(value.value)
        this.user = await this.authService.getLoggedUser();
        this.cache = await this.cacheService.getCacheById(id);
        this.ready = true;
      }
    })
  }


  async onMapClick() {
    this.showMap = !this.showMap
  }

  async onFind() {
    await this.navController.navigateRoot("found", {
      queryParams: {
        id: this.cache.id
      }
    })
  }
}
