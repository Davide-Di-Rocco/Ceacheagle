import {Component, Input, OnInit} from '@angular/core';
import {Stats} from "../../models/stats.model";
import {MyCache} from "../../models/cache.model";
import {MenuController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-active-cache',
  templateUrl: './active-cache.component.html',
  styleUrls: ['./active-cache.component.scss'],
})
export class ActiveCacheComponent implements OnInit {

  @Input() cache!: MyCache
  @Input() statistiche!: Stats

  constructor(
    private navController: NavController,
    private menuController: MenuController
  ) {
  }

  ngOnInit() {
  }

  async onClick() {
    await this.menuController.close()
    await this.navController.navigateForward('sections/activated')
  }

  formatElapsedTime(): string {
    if (!this.statistiche.startTime) {
      return '00h 00m 00s';
    }

    const startTime = new Date(this.statistiche.startTime)
    const currentTime = new Date()
    const elapsedTimeInSeconds = (currentTime.getTime() - startTime.getTime()) / 1000

    const hours = Math.floor(elapsedTimeInSeconds / 3600)
    const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60)

    return this.padNumber(hours, 2) + 'h ' + this.padNumber(minutes, 2) + 'm '
  }

  private padNumber(num: number, size: number): string {
    let numStr = num.toString()
    while (numStr.length < size) {
      numStr = '0' + numStr
    }
    return numStr
  }
}
