import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    private navController: NavController,
    private menuController: MenuController
  ) {
    this.menuController.enable(true)
  }

  ngOnInit() {
  }

}
