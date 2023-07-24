import {Injectable} from '@angular/core';
import {firstValueFrom, lastValueFrom, map, Observable} from "rxjs";
import {MyCache} from "../models/cache.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Hint} from "../models/hint.model";

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cacheUrl = environment.hostname + environment.cacheDir

  constructor(
    private http: HttpClient
  ) {
  }

  async getCaches(userId: number): Promise<MyCache[]> {
    const url = `${this.cacheUrl}?creatorId_ne=${userId}`
    return firstValueFrom(await this.http.get<MyCache[]>(url)
      .pipe(
        map(
          cacheList => cacheList.map(
            cache => new MyCache(cache)
          )
        )
      ))
  }

  async getFilteredCaches(minRating: number, maxDifficulty: number, minDifficulty: number, userId: number) {
    const url = `${this.cacheUrl}?difficulty_lte=${maxDifficulty}&difficulty_gte=${minDifficulty}&creatorId_ne=${userId}`;
    return firstValueFrom(await this.http.get<MyCache[]>(url)
      .pipe(
        map(cacheList => {
          const list = cacheList.map(cache => new MyCache(cache));
          return list.filter(cache => {
            const reviews = cache.reviews;
            const totalReviews = reviews.length;
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = Math.round(totalRating / totalReviews);
            return averageRating >= minRating;
          });
        }))
    )
  }

  async getCacheById(id: number): Promise<MyCache> {
    return firstValueFrom(await this.http.get<MyCache>(`${this.cacheUrl}\\${id}`)
      .pipe(
        map(
          cache => new MyCache(cache)
        )
      )
    )
  }

  async getUserCaches(userId: number): Promise<MyCache[]> {
    const url = `${this.cacheUrl}?creatorId=${userId}`
    return firstValueFrom(await this.http.get<MyCache[]>(url)
      .pipe(
        map(
          cacheList => cacheList.map(
            cache => new MyCache(cache)
          )
        )
      ))
  }

  async getFavoritesCaches(favorites: number[]) {
    const url = `${this.cacheUrl}`;
    return firstValueFrom(await this.http.get<MyCache[]>(url)
      .pipe(
        map(cacheList => {
          const list = cacheList.map(cache => new MyCache(cache));
          return list.filter(cache => {
            return favorites.includes(cache.id)
          })
        })
      )
    )
  }

  async createNewCache(
    cacheData: {
      title: string,
      description: string,
      difficulty: number,
      hints: Hint[],
      photo: string,
      creatorId: number,
      latitude: number,
      longitude: number,
      reviews: []
    }
  ) {
    try {
      return await this.postRequest(this.cacheUrl, cacheData)
    } catch (error) {
      return -1;
    }
  }


  private async postRequest<T>(url: string, data: any): Promise<number> {
    try {
      const observable: Observable<MyCache> = this.http.post<MyCache>(url, data);
      return ((await lastValueFrom(observable)).id) // L'operazione POST è andata a buon fine
    } catch (error) {
      console.error(error);
      return -1; // Si è verificato un errore durante l'operazione POST
    }
  }

}
