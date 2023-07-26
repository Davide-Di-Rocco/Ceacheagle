import {inject, Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {NavController} from "@ionic/angular";
import {firstValueFrom, lastValueFrom, map} from "rxjs";
import {Preferences} from "@capacitor/preferences";
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from "@angular/router";
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private usersUrl = environment.hostname + environment.userDir // URL dell'API
    private sessionTimeout = 43200000    // Timeout della sessione in millisecondi (12 ore)

    constructor(
        private http: HttpClient,
        private navController: NavController,
        private userService: UserService
    ) {
    }

    async login(username: string, password: string): Promise<string> {
        try {
            // Costruisci l'URL con i parametri username e password
            const url = `${this.usersUrl}?username=${username}&password=${password}`
            const users = await firstValueFrom(this.http.get<User[]>(url))

            if (!users[0]) return "credential_error"

            const user: User = users[0]
            await Preferences.set({key: 'user', value: JSON.stringify(user)})
            const now = new Date().getTime();
            await Preferences.set({key: "loginTime", value: now.toString()})
            for (let stats of user.completed) {
                if (!stats.endTime) {
                    await Preferences.set({
                        key: "active", value: stats.cacheId.toString()
                    })
                    break
                }
            }
            return "success"
        } catch (error) {
            return "server_error";
        }
    }

    async logout() {
        await Preferences.clear()
        await this.navController.navigateRoot("login")
    }

    private async isLogged(): Promise<boolean> {
        const {value} = await Preferences.get({key: "loginTime"})
        const now = new Date().getTime()
        return value != null && now - parseInt(value) < this.sessionTimeout
    }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!await this.isLogged()) {
            await this.navController.navigateRoot("login")
            return false
        }
        return true
    }

    async fixCompleted() {
        const users = await lastValueFrom(this.http.get<User[]>(this.usersUrl)
            .pipe(
                map(
                    users => users.map(
                        user => new User(user)
                    )
                )
            )
        )
        users.forEach(user => {
            user.completed = user.completed.filter(stat => {
                const end = stat.endTime ? new Date(stat.endTime) : null;
                if (!end) {
                    const start = stat.startTime ? new Date(stat.startTime) : null;
                    return !start || !this.isOlderThan24Hours(start);
                }
                return true;
            });
            this.userService.updateUser(user)
        })
    }

    isOlderThan24Hours(date: Date) {
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        return date < twentyFourHoursAgo;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
    return inject(AuthenticationService).canActivate(next, state);
}
