import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../environments/environment";
import {LatLng} from "@capacitor/google-maps/dist/typings/definitions";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  @Input() position!: LatLng
  private marker!: string | null

  @ViewChild('mapRef')
  mapRef!: ElementRef<HTMLElement>;
  map!: GoogleMap;

  constructor() {
  }

  async ngAfterViewInit() {
    console.log(this.mapRef)
    await this.createMap()
  }

  async createMap() {
    if (this.mapRef) {
      if (!this.map)
        this.map = await GoogleMap.create({
          id: "cache-map",
          apiKey: environment.mapsKey,
          element: this.mapRef.nativeElement,
          config: {
            center: this.position ? {
              lat: this.position.lat,
              lng: this.position.lng,
            } : {
              lat: environment.latAquila,
              lng: environment.lngAquila
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
            lat: this.position.lat,
            lng: this.position.lng,
          }
        }
      )
    } else {
      console.error(this.mapRef)
    }
  }

}
