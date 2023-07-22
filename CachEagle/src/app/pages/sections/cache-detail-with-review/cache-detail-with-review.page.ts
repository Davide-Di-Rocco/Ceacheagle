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

  constructor(
    private cacheService: CacheService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      const id = parseInt(params['id'], 0);
      this.cache = await this.cacheService.getCacheById(id)
    });
    this.user = await this.authService.getLoggedUser()
  }

  onMapClick() {

  }

  getUserName(id: number) {
    console.log("Prendi utente numero", id)
    return ('utente ' + id);
    //return (await this.userService.getUserById(id)).username;
  }

  async onStarClick(id: number) {
    await this.userService.editFavorite(id)
    this.user = await this.authService.getLoggedUser()
  }
}

