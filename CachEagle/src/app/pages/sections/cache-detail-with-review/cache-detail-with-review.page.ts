import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../../services/cache.service";
import {MyCache} from "../../../models/cache.model";
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";
import {AlertController, NavController} from "@ionic/angular";

@Component({
    selector: 'app-cache-detail-with-review',
    templateUrl: './cache-detail-with-review.page.html',
    styleUrls: ['./cache-detail-with-review.page.scss'],
})
export class CacheDetailWithReviewPage implements OnInit {

    protected readonly ColorSchemaType = ColorSchemaType;
    protected cache!: MyCache
    protected user!: User
    protected ready: boolean = false
    protected showMap: boolean = false

    constructor(
        private cacheService: CacheService,
        private route: ActivatedRoute,
        private userService: UserService,
        private navController: NavController,
        private alert: AlertController
    ) {
    }

    async ngOnInit() {
        this.route.queryParams.subscribe(async (params) => {
            const id = parseInt(params['id'], 0);
            this.user = await this.userService.getLoggedUser();
            this.cache = await this.cacheService.getCacheById(id);
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

    async active() {
        if (await this.userService.addActiveCache(this.cache.id)) {
            await this.popup(
                "Cache attivata",
                "Ora sei pronto per iniziare la tua ricerca. Ricorda hai solo 24h di tempo, al termine dei quali il tuo obiettivo sarà fallito"
            )
            await this.navController.navigateForward("sections/activated")
        } else {
            await this.popup("Operazione fallita", "Non è possibile attivare questa cache, ne hai già un'altra attiva!")
        }
    }

    async popup(title: string, message: string) {
        const popup = await this.alert.create({
            header: title,
            message: message,
            buttons: ["OK"]
        });
        await popup.present();
    }
}

