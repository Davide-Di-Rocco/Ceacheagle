import {Component, OnInit} from '@angular/core';
import {MyCache} from "../../../models/cache.model";
import {User} from "../../../models/user.model";
import {CacheService} from "../../../services/cache.service";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {Stats} from "../../../models/stats.model";
import {Review} from "../../../models/review.modal";

@Component({
    selector: 'app-cache-detail-completed',
    templateUrl: './cache-detail-completed.page.html',
    styleUrls: ['./cache-detail-completed.page.scss'],
})
export class CacheDetailCompletedPage implements OnInit {

    protected readonly ColorSchemaType = ColorSchemaType;
    protected cache!: MyCache
    protected user!: User
    protected ready: boolean = false
    protected showMap: boolean = false
    protected showReview: boolean = false
    protected statistiche!: Stats;
    protected recensione!: Review;

    constructor(
        private cacheService: CacheService,
        private userService: UserService,
        private route: ActivatedRoute,
        private navController: NavController
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(async (params) => {
            const id = parseInt(params['id'], 0);
            this.user = await this.userService.getLoggedUser();
            this.cache = await this.cacheService.getCacheById(id);
            this.statistiche = <Stats>this.user.completed.find(stat => stat.cacheId == this.cache.id)
            this.recensione = <Review>this.cache.reviews.find(r => r.userId = this.user.id)
            this.ready = true;
        })
    }

    async onMapClick() {
        this.showMap = !this.showMap
    }

    async onStarClick(id: number) {
        await this.userService.editFavorite(id)
        this.user = await this.userService.getLoggedUser()
    }

    formatElapsedTime(): string {
        if (!this.statistiche.startTime) {
            return '00h 00m 00s';
        }

        const startTime = new Date(this.statistiche.startTime)
        const currentTime = new Date()
        const elapsedTimeInSeconds = (currentTime.getTime() - startTime.getTime()) / 1000

        const hours = Math.floor(elapsedTimeInSeconds / 3600)
        const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60)
        const seconds = Math.floor(elapsedTimeInSeconds % 60)

        return this.padNumber(hours, 2) + 'h ' + this.padNumber(minutes, 2) + 'm ' + this.padNumber(seconds, 2) + 's'
    }

    private padNumber(num: number, size: number): string {
        let numStr = num.toString()
        while (numStr.length < size) {
            numStr = '0' + numStr
        }
        return numStr
    }

}
