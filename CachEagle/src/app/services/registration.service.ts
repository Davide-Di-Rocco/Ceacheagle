import {Injectable} from '@angular/core';
import {lastValueFrom, take} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) {
  }

  async register(username: string, email: string, password: string) {
    const url1 = `${this.apiUrl}?email=${email}`;
    const url2 = `${this.apiUrl}?username=${username}`;

    try {
      const emailResponse = await this.getRequest<number[]>(url1);
      const usernameResponse = await this.getRequest<number[]>(url2);

      if (emailResponse.length === 0 && usernameResponse.length === 0) {
        const userData = {
          email: email,
          username: username,
          password: password,
          favorites: []
        };

        const registrationResult = await this.postRequest(this.apiUrl, userData);
        return registrationResult ? "success" : "server_error";
      } else if (emailResponse.length > 0) {
        return "duplicate_email";
      } else if (usernameResponse.length > 0) {
        return "duplicate_username";
      }
    } catch (error) {
      return "server_error";
    }

    return "server_error";
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
