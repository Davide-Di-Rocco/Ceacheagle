import {Injectable} from '@angular/core';
import {firstValueFrom, map} from "rxjs";
import {MyCache} from "../models/cache.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cacheUrl = environment.hostname + environment.cacheDir

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
  ) {
  }

  async getCaches(): Promise<MyCache[]> {
    const url = `${this.cacheUrl}?creatorId_ne=${(await this.authService.getLoggedUser()).id}`
    return firstValueFrom(await this.http.get<MyCache[]>(url)
      .pipe(
        map(
          cacheList => cacheList.map(
            cache => new MyCache(cache)
          )
        )
      ))
  }

  async getFilteredCaches(minRating: number, maxDifficulty: number, minDifficulty: number) {
    const url = `${this.cacheUrl}?difficulty_lte=${maxDifficulty}&difficulty_gte=${minDifficulty}&creatorId_ne=${(await this.authService.getLoggedUser()).id}`;
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
}
