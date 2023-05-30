import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mycaches',
  templateUrl: './mycaches.page.html',
  styleUrls: ['./mycaches.page.scss'],
})
export class MycachesPage implements OnInit {

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
