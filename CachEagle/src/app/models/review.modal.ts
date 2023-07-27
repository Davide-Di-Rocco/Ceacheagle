export class Review {

    rating!: number;
    comment!: string;
    userId!: number;

    constructor(rating: number, comment: string, userId: number) {
        this.rating = rating
        this.comment = comment
        this.userId = userId
    }
}
