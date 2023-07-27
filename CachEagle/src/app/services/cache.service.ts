import {Injectable} from '@angular/core';
import {firstValueFrom, lastValueFrom, map, Observable} from "rxjs";
import {MyCache} from "../models/cache.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Hint} from "../models/hint.model";
import {Preferences} from "@capacitor/preferences";
import {Stats} from "../models/stats.model";
import {User} from "../models/user.model";

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
        const activeId = (await Preferences.get({key: 'active'})).value
        let url = `${this.cacheUrl}?creatorId_ne=${userId}`;
        if (activeId) url += `&id_ne=${activeId}`
        return firstValueFrom(this.http.get<MyCache[]>(url)
            .pipe(
                map(
                    cacheList => {
                        const list = cacheList.map(cache => new MyCache(cache));
                        return list.filter(cache => {
                            return cache.reviews.find(review => review.userId == userId)
                        })
                    }
                )
            ))
    }

    async getFilteredCaches(minRating: number, maxDifficulty: number, minDifficulty: number, userId: number) {
        const activeId = (await Preferences.get({key: 'active'})).value
        let url = `${this.cacheUrl}?difficulty_lte=${maxDifficulty}&difficulty_gte=${minDifficulty}&creatorId_ne=${userId}`
        if (activeId) url += `&id_ne=${activeId}`
        return firstValueFrom(this.http.get<MyCache[]>(url)
            .pipe(
                map(cacheList => {
                    let list = cacheList.map(cache => new MyCache(cache));
                    list = list.filter(cache => {
                        return cache.reviews.find(review => review.userId == userId)
                    })
                    return list.filter(cache => {
                        const reviews = cache.reviews;
                        const totalReviews = reviews.length;
                        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                        const averageRating = Math.round(totalRating / totalReviews);
                        return averageRating >= minRating;
                    });
                })
            )
        )
    }

    async getCacheById(id: number): Promise<MyCache> {
        return firstValueFrom(this.http.get<MyCache>(`${this.cacheUrl}\\${id}`)
            .pipe(
                map(
                    cache => new MyCache(cache)
                )
            )
        )
    }

    async getUserCaches(userId: number): Promise<MyCache[]> {
        const url = `${this.cacheUrl}?creatorId=${userId}`
        return firstValueFrom(this.http.get<MyCache[]>(url)
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
        return firstValueFrom(this.http.get<MyCache[]>(url)
            .pipe(
                map(cacheList => {
                    const list = cacheList.map(cache => new MyCache(cache));
                    return list.filter(cache => {
                        return favorites.includes(cache.id);
                    });
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
            const observable: Observable<MyCache> = this.http.post<MyCache>(this.cacheUrl, cacheData);
            return ((await lastValueFrom(observable)).id)
        } catch (error) {
            return -1;
        }
    }

    async updateCache(
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
        }, id: number
    ) {
        const url = `${this.cacheUrl}/${id}`;
        return await firstValueFrom(this.http.put(url, cacheData))
    }

    async getActiveCache(user: User) {
        const preference = await Preferences.get({key: 'active'})
        if (preference.value && !Number.isNaN(preference.value)) {
            const id = parseInt(preference.value)
            return {cache: await this.getCacheById(id), stats: <Stats>user.completed.find(stat => stat.cacheId === id)}
        }
        return null
    }

    async updateCache2(cache: MyCache) {
        const url = `${this.cacheUrl}/${cache.id}`;
        return await firstValueFrom(this.http.put(url, cache))
    }
}
