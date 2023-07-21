import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../../services/cache.service";
import {MyCache} from "../../../models/cache.model";
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cache-detail-with-review',
  templateUrl: './cache-detail-with-review.page.html',
  styleUrls: ['./cache-detail-with-review.page.scss'],
})
export class CacheDetailWithReviewPage implements OnInit {

  protected readonly ColorSchemaType = ColorSchemaType;
  protected cache!: MyCache
  private id!: number

  constructor(
    private cacheService: CacheService,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      var id = parseInt(params['id'], 0)
      this.cache = await this.cacheService.getCacheById(id)
    });

  }
}

