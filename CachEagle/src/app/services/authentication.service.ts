import {inject, Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {NavController} from "@ionic/angular";
import {firstValueFrom} from "rxjs";
import {Preferences} from "@capacitor/preferences";
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private usersUrl = environment.hostname + environment.userDir // URL dell'API
  private sessionTimeout = 43200000    // Timeout della sessione in millisecondi (12 ore)
  private loggedUser!: User

  constructor(
    private http: HttpClient,
    private navController: NavController
  ) {
  }

  async login(username: string, password: string): Promise<string> {
    try {
      // Costruisci l'URL con i parametri username e password
      const url = `${this.usersUrl}?username=${username}&password=${password}`
      const users = await firstValueFrom(await this.http.get<User[]>(url))

      if (!users[0]) return "credential_error"

      const user: User = users[0]
      await Preferences.set({key: 'user', value: JSON.stringify(user)})
      const now = new Date().getTime();
      await Preferences.set({key: "loginTime", value: now.toString()})
      this.loggedUser = user
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

  async getLoggedUser(): Promise<User> {
    let data = await Preferences.get({key: "user"})
    this.loggedUser = JSON.parse(data.value!)
    return this.loggedUser
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!await this.isLogged()) {
      await this.navController.navigateRoot("login")
      return false
    }
    return true
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  return inject(AuthenticationService).canActivate(next, state);
}
