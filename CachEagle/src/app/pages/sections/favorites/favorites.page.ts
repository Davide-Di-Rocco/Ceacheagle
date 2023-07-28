import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../../services/cache.service";
import {MyCache} from "../../../models/cache.model";
import {User} from "../../../models/user.model";
import {NavController} from "@ionic/angular";
import {UserService} from "../../../services/user.service";

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.page.html',
    styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
    protected cachesList!: MyCache[]
    protected ready = false;
    private loggedUser!: User

    constructor(
        private navController: NavController,
        private cacheService: CacheService,
        private userService: UserService
    ) {
    }

    async ionViewWillEnter() {
        await this.loadData()
    }

    async ngOnInit() {
        await this.loadData()
        this.ready = true;
    }

    async openDetail(id: number) {
        if (this.isCompleted(id)) {
            await this.navController.navigateForward(['sections/completedDetail'], {
                queryParams: {
                    id: id
                }
            });
        } else {
            await this.navController.navigateForward(['sections/detail'], {
                queryParams: {
                    id: id
                }
            });
        }
    }

    async removeFavorite(id: number) {
        await this.userService.editFavorite(id)
        let index = -1;
        for (let i = 0; i < this.cachesList.length; i++) {
            const c = this.cachesList[i]
            if (c.id == id) {
                index = i
                break
            }
        }
        if (index !== -1) {
            this.cachesList.splice(index, 1);
        }
    }

    isCompleted(id: number): boolean {
        return this.cachesList.find(c => c.id == id)?.reviews.find(r => r.userId == this.loggedUser.id) != undefined
    }

    private async loadData() {
        this.loggedUser = await this.userService.getLoggedUser()
        this.cachesList = await this.cacheService.getFavoritesCaches(this.loggedUser.favorites)
    }
}
