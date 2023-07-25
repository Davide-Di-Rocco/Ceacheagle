import { Component, OnInit } from '@angular/core';
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {CacheService} from "../../../services/cache.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {MyCache} from "../../../models/cache.model";
import {User} from "../../../models/user.model";

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
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      const id = parseInt(params['id'], 0);
      this.user = await this.authService.getLoggedUser();
      //this.cache = await this.cacheService.getActiveCache(id);
      this.ready = true;
    })
  }


  async onMapClick() {
    this.showMap = !this.showMap
  }
}
