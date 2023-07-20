import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColorSchemaType} from "../rating/rating.component";

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
  @Input() photo!: string
  @Output() locateClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() starClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() elementClick: EventEmitter<void> = new EventEmitter<void>();

  protected readonly ColorSchemaType = ColorSchemaType;

  constructor() {
  }

  ngOnInit() {
  }

  emitLocateClickEvent() {
    this.locateClick.emit();
  }

  emitElementClickEvent() {
    this.elementClick.emit();
  }

  emitStarClickEvent() {
    this.starred = !this.starred
    this.starClick.emit();
  }

}
