import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../../environments/environment";
import {ModalController, NavController, RangeCustomEvent} from "@ionic/angular";
import {RangeValue} from '@ionic/core';
import {MyCache} from "../../../models/cache.model";
import {CacheService} from "../../../services/cache.service";
import {Geolocation, Position} from "@capacitor/geolocation";
import {LatLng} from "@capacitor/google-maps/dist/typings/definitions";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>
  map!: GoogleMap | null

  protected difficultValue: RangeValue = {lower: 0, upper: 5}
  protected ratingValue = 0;
  protected loggedUser!: User
  protected cacheList!: MyCache[]
  private watchPositionListener: any
  private currentLocationMarker!: string
  private markers: { [markerId: string]: number } = {}
  private permission: boolean = false

  constructor(
    private modalController: ModalController,
    private cacheService: CacheService,
    private userService: UserService,
    private navController: NavController,
  ) {

  }

  async ngOnInit() {
    await this.requestGeolocationPermissions()
  }

  async ionViewWillLeave() {
    await this.closeBottomList()
    if (this.permission) await this.stopWatchingPosition()
    this.map?.destroy()
    this.map = null
    this.markers = {}
  }

  async ionViewDidEnter() {
    this.loggedUser = await this.userService.getLoggedUser()
    this.cacheList = await this.cacheService.getCaches(this.loggedUser.id)
    await this.createMap()
    if (this.permission) await this.startWatchingPosition()
  }

  async createMap() {
    if (!this.map)
      this.map = await GoogleMap.create({
        id: "my-map",
        apiKey: environment.mapsKey,
        element: this.mapRef.nativeElement,
        config: {
          center: {
            lat: environment.latAquila,
            lng: environment.lngAquila,
          },
          zoom: environment.defaultZoom,
          streetViewControl: false

        },
        forceCreate: false
      })
    await this.addMarkerToMap(this.cacheList)
    await this.map.setOnMarkerClickListener(async marker => {
      const markerId = marker.markerId
      const cacheId = this.markers[markerId]
      await this.openDetail(cacheId)
    })
  }

  pinFormatter(value: number) {
    return `${value}`;
  }

  async onFilterSubmit() {
    if (typeof this.difficultValue !== "number")
      this.cacheList = await this.cacheService.getFilteredCaches(this.ratingValue, this.difficultValue.upper, this.difficultValue.lower, this.loggedUser.id)
    await this.addMarkerToMap(this.cacheList)
  }

  async onFilterCancel() {
    this.difficultValue = {lower: 0, upper: 5}
    this.ratingValue = 0
    this.cacheList = await this.cacheService.getCaches(this.loggedUser.id)
    await this.addMarkerToMap(this.cacheList)
  }

  onDifficultyChange(e: Event) {
    this.difficultValue = (e as RangeCustomEvent).detail.value
  }

  onRatingChange(rate: number) {
    this.ratingValue = rate
  }

  async closeBottomList() {
    if (await this.modalController.getTop())
      await this.modalController.dismiss()
  }

  async onLocateClick(latitude: number, longitude: number) {
    await this.modalController.dismiss()
    await this.map?.setCamera({
        coordinate: {
          lat: latitude,
          lng: longitude
        },
        zoom: 22,
        animate: true,
      }
    )
  }

  async onStarClick(id: number) {
    await this.userService.editFavorite(id)
    this.loggedUser = await this.userService.getLoggedUser()
    await this.addMarkerToMap(this.cacheList)
  }

  async openDetail(id: number) {
    await this.navController.navigateForward(['sections/detail'], {
      queryParams: {
        id: id
      }
    });
  }

  async startWatchingPosition() {
    this.watchPositionListener = Geolocation.watchPosition({enableHighAccuracy: true}, (position: Position | null, err: any) => {
      if (err) console.error(err)
      console.log(position)
      if (!position) this.updateCurrentLocationMarker(null);
      else
        this.updateCurrentLocationMarker(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        );
    });
  }

  async stopWatchingPosition() {
    if (this.watchPositionListener) {
      await Geolocation.clearWatch({id: this.watchPositionListener});
      this.watchPositionListener = null;
    }
  }

  async updateCurrentLocationMarker(coordinates: LatLng | null) {
    if (coordinates && this.map) {
      if (this.currentLocationMarker) await this.map.removeMarker(this.currentLocationMarker)
      this.currentLocationMarker = await this.map.addMarker({
        coordinate: coordinates,
        title: "Current Location",
        iconUrl: '../../../../assets/img/currentPositionMarker.png',
        iconSize: {
          height: 26,
          width: 26
        },
        iconAnchor: {
          x: 13,
          y: 13
        }
      });
    }
  }

  async addMarkerToMap(caches: MyCache[]) {
    if (this.markers && this.map) {
      for (let markersKey in this.markers) {
        await this.map.removeMarker(markersKey)
        delete this.markers[markersKey]
      }
    }

    for (const c of caches) {
      this.map?.addMarker({
        coordinate: {
          lat: c.latitude,
          lng: c.longitude,
        },
        title: c.title,
        snippet: c.description,
        iconUrl: this.loggedUser.favorites.includes(c.id) ? '../../../../assets/img/starredMarker.png' : '../../../../assets/img/cacheMarker.png',
        iconSize: {
          height: 42,
          width: 28
        },
        iconAnchor: {
          x: 14,
          y: 42
        }
      }).then(markerId => {
        this.markers[markerId] = c.id

      })
    }
  }

  async requestGeolocationPermissions() {
    const permissionState = await Geolocation.checkPermissions();
    if (permissionState.location !== "granted") {
      const permissionRequestResult = await Geolocation.requestPermissions();
      if (permissionRequestResult.location !== "granted") {
        console.error('Autorizzazioni di geolocalizzazione negate')
        this.permission = false
        return
      }
    }
    this.permission = true
  }
}
