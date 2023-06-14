import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  @Input() editable: boolean = true
  @Input() icon_name!: string;
  @Input() rating!: number
  @Output() ratingChange: EventEmitter<number> = new EventEmitter()


  constructor() {
  }

  ngOnInit() {
  }

  rate(index: number) {
    this.rating = index
    this.ratingChange.emit(this.rating)
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return Colors.GREY
    }
    switch (this.rating) {
      case 1:
      case 2:
        return Colors.RED
      case 3:
        return Colors.YELLOW
      case 4:
      case 5:
        return Colors.GREEN
      default:
        return Colors.GREY
    }
  }

  isAboveRating(index: number): boolean {
    return index > this.rating
  }
}

enum Colors {
  GREY = "#E0E0E0",
  GREEN = "#00BF63",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}
