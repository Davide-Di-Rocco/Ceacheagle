import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.scss'],
})
export class PageSelectorComponent implements OnInit {
  @Input() pages!: number;
  @Input() currentPage: number = 1;
  @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onPageSelected(page: number) {
    this.currentPage = page;
    this.pageSelected.emit(page);
  }

  getPagesArray(): number[] {
    return new Array(this.pages);
  }
}
