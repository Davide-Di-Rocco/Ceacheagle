import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../../services/cache.service";
import {AlertController, NavController} from "@ionic/angular";
import {MyCache} from "../../../models/cache.model";
import {User} from "../../../models/user.model";
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Review} from "../../../models/review.modal";

@Component({
    selector: 'app-review',
    templateUrl: './review.page.html',
    styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

    protected readonly ColorSchemaType = ColorSchemaType;
    protected ready = false
    protected cache!: MyCache
    protected rate: number = 0
    protected reviewFormModule: FormGroup;
    private user!: User

    constructor(
        private cacheService: CacheService,
        private userService: UserService,
        private navController: NavController,
        private alert: AlertController,
        fb: FormBuilder,
    ) {
        this.reviewFormModule = fb.group({
            descrizione: ['', Validators.required]
        })
    }

    async ngOnInit() {
        this.user = await this.userService.getLoggedUser()
        const data = await this.cacheService.getActiveCache(this.user = await this.userService.getLoggedUser())
        if (data) {
            this.cache = data.cache
            this.ready = true
        } else {
            await this.navController.navigateRoot("sections/search")
        }

    }

    onEdit(value: number) {
        this.rate = value
    }

    async submit() {
        if (this.reviewFormModule.valid && this.rate > 0) {
            this.cache.reviews.push(new Review(this.rate, this.reviewFormModule.value.description, this.user.id))
            await this.cacheService.updateCache2(this.cache)
            await this.userService.updateUser(this.user)
            await this.navController.navigateRoot("sections/search")
        } else {
            await this.popup("ERRORE", "Compila tutti i campi correttamente e riprova!")
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
