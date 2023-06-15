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

  constructor(cache?: MyCache) {
    if (cache) {
      this.id = cache.id
      this.title = cache.title
      this.description = cache.description
      this.difficulty = cache.difficulty
      this.hints = cache.hints
      this.photo = cache.photo
      this.creatorId = cache.creatorId
      this.latitude = cache.latitude
      this.longitude = cache.longitude
      this.reviews = cache.reviews
    }
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
