import {Hint} from "./hint.model";
import {Review} from "./review.modal";

export class MyCache {
  id!: number
  title!: string
  description!: string
  difficulty!: number
  hints!: Hint[]
  photo!: string
  creatorId!: number
  latitude!: number
  longitude!: number
  reviews!: Review[]

  constructor() {
  }

  public getRating() {
    if (this.reviews.length === 0) {
      return 0;
    }
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating, 0
    );
    return Math.round(totalRating / this.reviews.length)
  }
}
