import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {
  }

  async register(username: string, email: string, password: string) {
    const url1 = `${this.apiUrl}?email=${email}`
    const url2 = `${this.apiUrl}?username=${username}`
    const result: number[] = await Promise.all([
      ...await this.getRequest<number[]>(url1),
      ...await this.getRequest<number[]>(url2)
    ]);

    if (result.length == 0) {
      let userData = {
        email: email,
        username: username,
        password: password
      }
      return await this.postRequest(this.apiUrl, userData)
    }
    return false;
  }

  private async getRequest<T>(url: string): Promise<T> {
    const observable = this.http.get<T>(url).pipe(take(1));
    return lastValueFrom(observable);
  }

  private async postRequest<T>(url: string, data: any): Promise<boolean> {
    try {
      const observable = this.http.post<T>(url, data);
      await lastValueFrom(observable);
      return true; // L'operazione POST è andata a buon fine
    } catch (error) {
      console.error(error);
      return false; // Si è verificato un errore durante l'operazione POST
    }
  }


}
