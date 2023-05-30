import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  cachesList = [
    {title: "Cache 1"},
    {title: "Cache 2"},
    {title: "Cache 3"},
    {title: "Cache 4"},
  ]

  constructor() {
  }

  ngOnInit() {
  }

}
