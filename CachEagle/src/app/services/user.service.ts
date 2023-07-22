import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {User} from "../models/user.model";
import {firstValueFrom, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.hostname + environment.userDir // URL dell'API

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {

  }

  async editFavorite(cacheID: number) {
    const loggedUser = await this.authService.getLoggedUser();
    if (loggedUser.favorites.includes(cacheID)) {
      const index = loggedUser.favorites.indexOf(cacheID);
      if (index !== -1) {
        loggedUser.favorites.splice(index, 1);
      }
    } else {
      loggedUser.favorites.push(cacheID);
    }
    await this.updateUser(loggedUser)
  }

  private async updateUser(user: User) {
    const url = `${this.usersUrl}/${user.id}`;
    return firstValueFrom(await this.http.put(url, user));
  }

  async getUserById(id: number): Promise<User> {
    return firstValueFrom(await this.http.get<User>(`${this.usersUrl}\\${id}`)
      .pipe(
        map(
          user => new User(user)
        )
      )
    )
  }
}
