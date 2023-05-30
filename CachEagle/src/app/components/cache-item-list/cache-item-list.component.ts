import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cache-item-list',
  templateUrl: './cache-item-list.component.html',
  styleUrls: ['./cache-item-list.component.scss'],
})
export class CacheItemListComponent implements OnInit {

  @Input() title!: string
  @Input() starred!: boolean
  @Input() rate!: number
  @Input() difficulty!: number

  constructor() {
  }

  ngOnInit() {
  }

}
