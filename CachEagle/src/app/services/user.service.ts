import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {firstValueFrom, map} from "rxjs";
import {Preferences} from "@capacitor/preferences";
import {Stats} from "../models/stats.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private usersUrl = environment.hostname + environment.userDir // URL dell'API

    constructor(
        private http: HttpClient,
    ) {

    }

    async editFavorite(cacheID: number) {
        const loggedUser = await this.getLoggedUser();
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

    async updateUser(user: User) {
        const url = `${this.usersUrl}/${user.id}`;
        if (await firstValueFrom(this.http.put(url, user))) {
            await Preferences.set({key: 'user', value: JSON.stringify(user)})
        }
    }

    async getUserById(id: number): Promise<User> {
        return firstValueFrom(this.http.get<User>(`${this.usersUrl}\\${id}`)
            .pipe(
                map(
                    user => new User(user)
                )
            )
        )
    }

    async addActiveCache(id: number) {
        if (await Preferences.get({key: 'active'}).then(result => result.value)) {
            return false
        }
        await this.getLoggedUser().then(user => {
            user.completed.push(new Stats(id))
            this.updateUser(user)
        })
        await Preferences.set({key: 'active', value: id.toString()})
        return true
    }

    async getLoggedUser(): Promise<User> {
        let data = await Preferences.get({key: "user"})
        return JSON.parse(data.value!)
    }
}
