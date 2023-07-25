import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../../services/cache.service";
import {MyCache} from "../../../models/cache.model";
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-cache-detail-with-review',
  templateUrl: './cache-detail-with-review.page.html',
  styleUrls: ['./cache-detail-with-review.page.scss'],
})
export class CacheDetailWithReviewPage implements OnInit {

  protected readonly ColorSchemaType = ColorSchemaType;
  protected cache!: MyCache
  protected user!: User
  protected ready: boolean = false
  protected showMap: boolean = false

  constructor(
    private cacheService: CacheService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      const id = parseInt(params['id'], 0);
      this.user = await this.authService.getLoggedUser();
      this.cache = await this.cacheService.getCacheById(id);
      this.ready = true;
    })
  }

  async onMapClick() {
    this.showMap = !this.showMap
  }

  async onStarClick(id: number) {
    await this.userService.editFavorite(id)
    this.user = await this.authService.getLoggedUser()
  }
}

