import {Component, OnInit} from '@angular/core';
import {CacheService} from "../../../services/cache.service";
import {AlertController, NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {MyCache} from "../../../models/cache.model";
import {User} from "../../../models/user.model";
import {ColorSchemaType} from "../../../components/rating/rating.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
    selector: 'app-review',
    templateUrl: './review.page.html',
    styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

    protected readonly ColorSchemaType = ColorSchemaType;
    protected ready = false
    protected cache!: MyCache
    private user!: User
    protected rate: number = 0

    protected reviewFormModule: FormGroup;

    constructor(
        private cacheService: CacheService,
        private userService: UserService,
        private navController: NavController,
        private route: ActivatedRoute,
        private alert: AlertController,
        fb: FormBuilder,
    ) {
        this.reviewFormModule = fb.group({
            descrizione: ['', Validators.required]
        })
    }

    async ngOnInit() {
        const idParam = this.route.snapshot.queryParamMap.get('id');
        const id = idParam ? parseInt(idParam, 0) : null;
        if (id) {
            this.user = await this.userService.getLoggedUser()
            this.cache = await this.cacheService.getCacheById(id)
            this.ready = true
        }

    }

    onEdit(value: number) {
        this.rate = value
    }

    submit() {
        if (this.reviewFormModule.valid && this.rate > 0) {

        } else {

        }
    }
}
