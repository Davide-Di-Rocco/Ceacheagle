import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CacheService} from "../../../services/cache.service";
import {MyCache} from "../../../models/cache.model";
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-cache-detail-with-review',
  templateUrl: './cache-detail-with-review.page.html',
  styleUrls: ['./cache-detail-with-review.page.scss'],
})
export class CacheDetailWithReviewPage implements OnInit {

  @ViewChild('mapRef')
  mapRef!: ElementRef<HTMLElement>;
  map!: GoogleMap;


  private marker!: string | null

  protected readonly ColorSchemaType = ColorSchemaType;
  protected cache!: MyCache
  protected user!: User
  protected usernames: { [id: number]: string } = {};
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
    await this.route.queryParams.subscribe(async params => {
      const id = parseInt(params['id'], 0)
      this.user = await this.authService.getLoggedUser()
      this.cache = await this.cacheService.getCacheById(id)
      for (const r of this.cache.reviews) {
        this.usernames[r.userId] = (await this.userService.getUserById(r.userId)).username
      }
      this.ready = true
    })
  }

  async onMapClick() {
    this.showMap = !this.showMap
    if (this.showMap)
      await this.createMap()
  }

  getUserName(id: number) {
    return this.usernames[id]
  }

  async onStarClick(id: number) {
    await this.userService.editFavorite(id)
    this.user = await this.authService.getLoggedUser()
  }

  async createMap() {
    if (this.mapRef) {
      if (!this.map)
        this.map = await GoogleMap.create({
          id: "cache-map",
          apiKey: environment.mapsKey,
          element: this.mapRef.nativeElement,
          config: {
            center: {
              lat: this.cache.latitude,
              lng: this.cache.longitude,
            },
            zoom: 18,
            streetViewControl: false

          },
          forceCreate: false
        })

      if (this.marker) {
        await this.map.removeMarker(this.marker)
        this.marker = null
      }

      await this.map.addMarker({
          coordinate: {
            lat: this.cache.latitude,
            lng: this.cache.longitude,
          },
          title: this.cache.title,
          snippet: this.cache.description,
        }
      )
    } else {
      console.error(this.mapRef)
    }
  }
}

