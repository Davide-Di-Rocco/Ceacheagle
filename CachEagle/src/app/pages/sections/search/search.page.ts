import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../../environments/environment";
import {ModalController, RangeCustomEvent} from "@ionic/angular";
import {RangeValue} from '@ionic/core';
import {Observable} from "rxjs";
import {MyCache} from "../../../models/cache.model";
import {CacheService} from "../../../services/cache.service";

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


  protected cacheList!: Observable<MyCache[]>

  constructor(
    private modalController: ModalController,
    private cacheService: CacheService
  ) {

  }

  ngOnInit() {
    this.cacheList = this.cacheService.getCaches()

  }

  async ionViewWillLeave() {
    await this.closeBottomList()
  }

  async ionViewDidEnter() {
    await this.createMap()
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

      },
      forceCreate: false
    })

    this.showCurrentLocation()

    await this.cacheList.forEach((list) => {
      for (let c of list) {
        this.map.addMarker({
          coordinate: {
            lat: c.latitude,
            lng: c.longitude,
          },
          title: c.title,
          snippet: c.description
        });
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

  showCurrentLocation() {
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
        animationDuration: 200
      }
    )
  }
}
