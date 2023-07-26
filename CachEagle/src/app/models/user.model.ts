import {Stats} from "./stats.model";

export class User {
  constructor(user?: User) {
    if (user) {
      this.id = user.id
      this.email = user.email
      this.username = user.username
      this.favorites = user.favorites
      this.completed = user.completed
    }
  }

  id!: number
  email!: string
  username!: string
  favorites!: number[]
  completed!: Stats[]
}
