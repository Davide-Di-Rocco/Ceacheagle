import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('map') mapRef!: ElementRef
  map!: GoogleMap

  isOpen: boolean = false

  constructor() {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.createMap()
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: "my-map",
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    })
  }

  protected readonly console = console;
}
