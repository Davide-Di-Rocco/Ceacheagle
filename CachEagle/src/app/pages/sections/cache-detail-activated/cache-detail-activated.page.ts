import {Component, OnInit} from '@angular/core';
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {CacheService} from "../../../services/cache.service";
import {MyCache} from "../../../models/cache.model";
import {User} from "../../../models/user.model";
import {Preferences} from "@capacitor/preferences";
import {AlertController, NavController} from "@ionic/angular";
import {UserService} from "../../../services/user.service";
import {Stats} from "../../../models/stats.model";

@Component({
    selector: 'app-cache-detail-activated',
    templateUrl: './cache-detail-activated.page.html',
    styleUrls: ['./cache-detail-activated.page.scss'],
})
export class CacheDetailActivatedPage implements OnInit {
    protected readonly ColorSchemaType = ColorSchemaType;
    protected statistiche!: Stats
    protected cache!: MyCache
    protected user!: User
    protected ready: boolean = false
    protected showMap: boolean = false
    protected time!: string
    private readonly timers: number[] = [];


    constructor(
        private cacheService: CacheService,
        private userService: UserService,
        private navController: NavController,
        private alert: AlertController
    ) {
    }

    async ngOnInit() {
        this.user = await this.userService.getLoggedUser();
        const response = await this.cacheService.getActiveCache(this.user)
        if (response) {
            this.cache = response.cache
            this.statistiche = response.stats
            this.timers.push(setInterval(() => this.time = this.formatElapsedTime()), 1000)
            this.timers.push(setInterval(() => this.updateDistance(), 1800))
            this.timers.push(setInterval(() => this.userService.updateUser(this.user), 10000))
            this.ready = true;
        } else {
            await this.navController.navigateRoot('sections/search')
        }
    }

    ionViewWillLeave() {
        this.timers.forEach(timer => clearInterval(timer))
    }


    async onMapClick() {
        this.showMap = !this.showMap
    }

    async onFind() {
        await this.navController.navigateRoot("found", {
            queryParams: {
                id: this.cache.id
            }
        })
    }

    async updateVisibility(value: boolean) {
        this.statistiche.hint = value;
        await this.userService.updateUser(this.user)
    }

    async updateDistance() {
        this.statistiche.distance += 0.001
        this.statistiche.distance = Number(this.statistiche.distance.toFixed(3))
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

    async deactivate() {
        if (await this.showConfirmationPopup()) {
            this.timers.forEach(timer => clearInterval(timer))
            this.user.completed = this.user.completed.filter(stat => {
                return stat.cacheId !== this.statistiche.cacheId
            })
            await Preferences.remove({key: 'active'})
            await this.userService.updateUser(this.user)
            await this.navController.navigateRoot('sections/search')
        }
    }

    async showConfirmationPopup(): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            const alert = await this.alert.create({
                header: 'Conferma',
                message: 'Sei sicuro di voler disattivare la cache?\nTutti i dati saranno persi e dovrai ricominciare da capo!',
                buttons: [
                    {
                        text: 'Annulla',
                        role: 'cancel',
                        handler: () => resolve(false)
                    },
                    {
                        text: 'Disattiva',
                        handler: () => resolve(true)
                    }
                ]
            });

            await alert.present();
        })
    }
}
