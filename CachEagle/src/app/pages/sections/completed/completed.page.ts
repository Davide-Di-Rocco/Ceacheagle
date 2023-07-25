import {Component, OnInit} from '@angular/core';
import {MyCache} from "../../../models/cache.model";

@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit {

  protected ready = false

  protected cachesList: MyCache[] = []

  constructor() {
  }

  async ionViewWillEnter() {
    await this.loadData()
  }

  async ngOnInit() {
    await this.loadData()
    this.ready = true
  }

  private async loadData() {

  }
}
