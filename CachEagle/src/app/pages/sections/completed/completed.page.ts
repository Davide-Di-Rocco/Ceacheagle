import {Component, OnInit} from '@angular/core';
import {MyCache} from "../../../models/cache.model";
import {CacheService} from "../../../services/cache.service";
import {UserService} from "../../../services/user.service";
import {NavController} from "@ionic/angular";
import {User} from "../../../models/user.model";

@Component({
    selector: 'app-completed',
    templateUrl: './completed.page.html',
    styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit {

    protected ready = false

    protected cachesList!: MyCache[]
    protected user!: User


    constructor(
        private cacheService: CacheService,
        private userService: UserService,
        private navController: NavController
    ) {
    }

    async ionViewWillEnter() {
        await this.loadData()
    }

    async ngOnInit() {
        await this.loadData()
        this.ready = true
    }

    async onClick(cacheId: number) {
        await this.navController.navigateForward('sections/completedDetail', {
            queryParams: {
                id: cacheId
            }
        })
    }

    private async loadData() {
        this.user = await this.userService.getLoggedUser()
        this.cachesList = await Promise.all(this.user.completed
            .filter(stat => stat.endTime)
            .map(stat => stat.cacheId)
            .map(async id => await this.cacheService.getCacheById(id)))
    }
}
