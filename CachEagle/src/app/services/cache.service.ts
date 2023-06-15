import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {MyCache} from "../models/cache.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cacheUrl = environment.hostname + environment.cacheDir

  constructor(
    private http: HttpClient
  ) {
  }

  getCaches(): Observable<MyCache[]> {
    return this.http.get<MyCache[]>(this.cacheUrl)
      .pipe(
        map(
          cacheList => cacheList.map(
            cache => new MyCache(cache)
          )
        )
      )
  }

  getCacheById(id: number): Observable<MyCache> {
    return this.http.get<MyCache>(`${this.cacheUrl}\\${id}`)
      .pipe(
        map(
          cache => new MyCache(cache)
        )
      )
  }
}
