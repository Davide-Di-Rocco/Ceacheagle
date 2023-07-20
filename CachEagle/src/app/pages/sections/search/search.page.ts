import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../../environments/environment";
import {ModalController, RangeCustomEvent} from "@ionic/angular";
import {RangeValue} from '@ionic/core';
import {Observable} from "rxjs";
import {MyCache} from "../../../models/cache.model";
import {CacheService} from "../../../services/cache.service";
import {Geolocation, Position} from "@capacitor/geolocation";
import {LatLng} from "@capacitor/google-maps/dist/typings/definitions";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  map!: GoogleMap;

  difficultValue: RangeValue = {lower: 0, upper: 5}
  ratingValue = 3;

  private watchPositionListener: any
  private currentLocationMarker: any

  protected loggedUser!: User

  protected cacheList!: Observable<MyCache[]>

  constructor(
    private modalController: ModalController,
    private cacheService: CacheService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
  }

  async ngOnInit() {
    this.cacheList = this.cacheService.getCaches()
    this.loggedUser = await this.authService.getLoggedUser()
  }

  async ionViewWillLeave() {
    await this.closeBottomList()
    this.stopWatchingPosition()
  }

  async ionViewDidEnter() {
    await this.createMap()
    await this.startWatchingPosition()
  }

  async createMap() {
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

    await this.map.enableClustering(2)
    await this.showCurrentLocation()

    await this.cacheList.forEach((list) => {
      for (let c of list) {
        if (c.creatorId != this.loggedUser.id) {
          this.map.addMarker({
            coordinate: {
              lat: c.latitude,
              lng: c.longitude,
            },
            title: c.title,
            snippet: c.description,
            iconUrl: '../../../../assets/img/pin.png',
            iconSize: {
              height: 60,
              width: 40
            },
            iconAnchor: {
              x: 20,
              y: 60
            }
          })
          ;
        }
      }
    })
  }

  pinFormatter(value: number) {
    return `${value}`;
  }

  onFilterSubmit() {
    console.log(this.difficultValue)
    console.log(this.ratingValue)
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
    await this.map.setCamera({
        coordinate: {
          lat: latitude,
          lng: longitude
        },
        zoom: 22,
        animate: true,
        animationDuration: 2000
      }
    )
  }

  async onStarClick(id: number) {
    await this.userService.editFavorite(id)
  }


  async getCurrentCoordinates(): Promise<LatLng | null> {
    try {
      const position = await Geolocation.getCurrentPosition();
      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      return null;
    }
  }

  async startWatchingPosition() {
    this.watchPositionListener = Geolocation.watchPosition({}, (position: Position | null) => {
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

  stopWatchingPosition() {
    if (this.watchPositionListener) {
      this.watchPositionListener.remove();
      this.watchPositionListener = null;
    }
  }

  async showCurrentLocation() {
    const coordinates = await this.getCurrentCoordinates();
    if (coordinates) {
      await this.updateCurrentLocationMarker(coordinates)
    }
  }

  async updateCurrentLocationMarker(coordinates: LatLng | null) {
    if (coordinates) {
      if (!this.currentLocationMarker) {
        this.currentLocationMarker = await this.map.addMarker({
          coordinate: coordinates,
          title: "Current Location",
          iconUrl: '../../../../assets/img/current.png',
          iconSize: {
            height: 40,
            width: 40
          },
          iconAnchor: {
            x: 20,
            y: 20
          }
        });
      } else {
        await this.currentLocationMarker.setPosition(coordinates);
      }
    }
  }
}
