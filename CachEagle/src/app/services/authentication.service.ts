import {inject, Injectable} from '@angular/core';
import {NavController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {Preferences} from "@capacitor/preferences";
import {lastValueFrom, take} from "rxjs";
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000/users'; // URL dell'API
  private sessionTimeout = 3600000;    // Timeout della sessione in millisecondi (1 ora)

  constructor(
    private http: HttpClient,
    private navController: NavController
  ) {

  }

  async login(username: string, password: string): Promise<boolean> {
    try {

      if (await this.isLogged()) return true

      const url = `${this.apiUrl}?username=${username}&password=${password}`;
      const result: number[] = await this.sendRequest<number[]>(url);
      const now = new Date().getTime();

      if (result.length === 1) {
        await Preferences.set({key: "login", value: now.toString()});
        return true
      }
      return false

    } catch (error) {
      console.error('Errore durante il login:', error);
      return false
    }
  }

  private async isLogged(): Promise<boolean> {
    const {value} = await Preferences.get({key: "login"});
    const now = new Date().getTime();

    return value != null && now - parseInt(value) < this.sessionTimeout
  }

  private async sendRequest<T>(url: string): Promise<T> {
    const observable = this.http.get<T>(url).pipe(take(1));
    return lastValueFrom(observable);
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
