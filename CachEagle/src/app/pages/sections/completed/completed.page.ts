import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit {
  
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
