export class User {
  constructor(user?: User) {
    if (user) {
      this.id = user.id
      this.email = user.email
      this.username = user.username
      this.favorites = user.favorites
    }
  }

  id!: number
  email!: string
  username!: string
  favorites!: number[]
}
