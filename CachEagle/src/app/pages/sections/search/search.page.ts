import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../../environments/environment";
import {ModalController, RangeCustomEvent} from "@ionic/angular";
import {RangeValue} from '@ionic/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>
  map!: GoogleMap

  difficultValue: RangeValue = {lower: 0, upper: 5}
  ratingValue: number = 3;

  cacheList = [
    {title: "Cache title 1", rate: 2, difficulty: 4, starred: false},
    {title: "Cache title 2", rate: 3, difficulty: 3, starred: true},
    {title: "Cache title 3", rate: 4, difficulty: 2, starred: false},
    {title: "Cache title 4", rate: 1, difficulty: 5, starred: true},
    {title: "Cache title 5", rate: 5, difficulty: 1, starred: true},
    {title: "Cache title 5", rate: 5, difficulty: 1, starred: true},
    {title: "Cache title 5", rate: 5, difficulty: 1, starred: true},
  ]

  constructor(
    private modalController: ModalController,
  ) {

  }

  ngOnInit() {
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
      forceCreate: true,
      config: {
        center: {
          lat: environment.latAquila,
          lng: environment.lngAquila,
        },
        zoom: environment.defaultZoom,
      },
    })
  }

  pinFormatter(value: number) {
    return `${value}`;
  }

  onFilterSubmit() {
    console.log(this.difficultValue)
    console.log(this.ratingValue)
  }

  onIonChange(e: Event) {
    this.difficultValue = (e as RangeCustomEvent).detail.value
  }

  onRatingChange(rate: number) {
    this.ratingValue = rate
  }

  async closeBottomList() {
    if (await this.modalController.getTop())
      await this.modalController.dismiss()
  }
}
