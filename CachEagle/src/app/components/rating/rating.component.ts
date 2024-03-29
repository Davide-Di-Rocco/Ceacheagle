import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface ColorSchema {
  ZERO: string;
  UNO: string;
  DUE: string;
  TRE: string;
  QUATTRO: string;
  CINQUE: string;
}

export enum ColorSchemaType {
  GGYR = 'GGYR',
  GRYG = 'GRYG',
}

const colorSchemes: { [key in ColorSchemaType]: ColorSchema } = {
  GGYR: {
    ZERO: '#E0E0E0',
    UNO: '#00BF63',
    DUE: '#8DBB00',
    TRE: '#FDBE00',
    QUATTRO: '#FF7200',
    CINQUE: '#E4211D',
  },
  GRYG: {
    ZERO: '#E0E0E0',
    UNO: '#E4211D',
    DUE: '#FF7200',
    TRE: '#FDBE00',
    QUATTRO: '#8DBB00',
    CINQUE: '#00BF63',
  },
};

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() colorSchema: ColorSchemaType = ColorSchemaType.GRYG;
  @Input() editable = true;
  @Input() icon_name!: string;
  @Input() rating!: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  @Input() width: string = '30vw';

  protected height!: string

  constructor() {
  }

  ngOnInit() {
    this.height = this.calculateOneSixth(this.width)
  }

  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return this.getColorValue(this.colorSchema, 'ZERO');
    }
    switch (this.rating) {
      case 1:
        return this.getColorValue(this.colorSchema, 'UNO');
      case 2:
        return this.getColorValue(this.colorSchema, 'DUE');
      case 3:
        return this.getColorValue(this.colorSchema, 'TRE');
      case 4:
        return this.getColorValue(this.colorSchema, 'QUATTRO');
      case 5:
        return this.getColorValue(this.colorSchema, 'CINQUE');
      default:
        return this.getColorValue(this.colorSchema, 'ZERO');
    }
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  getColorValue(colorSchema: ColorSchemaType, colorKey: keyof ColorSchema): string {
    const schema = colorSchemes[colorSchema];
    return schema[colorKey];
  }

  private calculateOneSixth(input: string): string {
    const unitIndex = input.search(/[^\d.]/)
    if (unitIndex === -1) {
      throw new Error('Invalid input format. The input should contain a numeric value with a unit of measurement.')
    }
    const value = parseFloat(input.slice(0, unitIndex))
    if (isNaN(value)) {
      throw new Error('Invalid numeric value in the input.')
    }
    const unit = input.slice(unitIndex).trim()
    const result = (value / 6).toFixed(2)
    return `${result}${unit}`
  }
}



