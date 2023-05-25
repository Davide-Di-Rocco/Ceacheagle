import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public findCaches = [
    {title: "Prova 1", difficulty: 3, evaluation: 4, starred: true, img_src: ""},
    {title: "Prova 2", difficulty: 4, evaluation: 2, starred: false, img_src: ""}
  ];

  constructor(
    private navController: NavController,
    private menuController: MenuController
  ) {
    this.menuController.enable(true)
  }

  ngOnInit() {
  }

  async showMenu() {
    await this.menuController.open()
  }

  showFilter() {

  }
}
