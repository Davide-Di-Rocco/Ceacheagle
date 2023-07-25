import {Component, OnInit} from '@angular/core';
import {MyCache} from "../../../models/cache.model";
import {User} from "../../../models/user.model";
import {CacheService} from "../../../services/cache.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-cache-detail-edit',
  templateUrl: './cache-detail-edit.page.html',
  styleUrls: ['./cache-detail-edit.page.scss'],
  animations: [
    trigger('slideAnimation1', [
      state('true', style({transform: 'translateX(-100%)'})),
      state('false', style({transform: 'translateX(20%)'})),
      transition('true <=> false', animate('300ms ease-in-out')),
    ]),
    trigger('slideAnimation2', [
      state('true', style({transform: 'translateX(-100%)'})),
      state('false', style({transform: 'translateX(0)'})),
      transition('true <=> false', animate('300ms ease-in-out')),
    ]),
  ],
})
export class CacheDetailEditPage implements OnInit {

  protected readonly ColorSchemaType = ColorSchemaType;
  protected cache!: MyCache
  protected user!: User
  protected ready: boolean = false
  protected showMap: boolean = false
  protected showReview: boolean = false

  constructor(
    private cacheService: CacheService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private navController: NavController
  ) {
  }

  ngOnInit() {
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

  onPageSelected(page: number) {
    this.showReview = page != 1;
  }

  async onEdit(id: number) {
    await this.navController.navigateForward(['sections/creation'], {
      queryParams: {
        id: id
      }
    })
  }
}
