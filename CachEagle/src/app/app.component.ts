import {Component, OnInit} from '@angular/core';
import {MenuController} from "@ionic/angular";
import {AuthenticationService} from "./services/authentication.service";
import {User} from "./models/user.model";
import {UserService} from "./services/user.service";
import {MyCache} from "./models/cache.model";
import {CacheService} from "./services/cache.service";
import {Preferences} from "@capacitor/preferences";
import {Stats} from "./models/stats.model";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public appPages = [
        {title: 'Cerca', url: 'sections/search', icon: 'search'},
        {title: 'Preferiti', url: 'sections/favorites', icon: 'bookmarks'},
        {title: 'Completate', url: 'sections/completed', icon: 'checkmark-circle'},
        {title: 'Le mie cache', url: 'sections/mycaches', icon: 'file-tray-full'},
    ]

    public logout_button = {title: 'Logout', icon: 'log-out'}
    protected user!: User
    protected activeCache: MyCache | null = null
    protected statistiche: Stats | null = null

    constructor(
        private menuController: MenuController,
        private authenticationService: AuthenticationService,
        private cacheService: CacheService,
        private userService: UserService
        ,
    ) {
    }

    async ngOnInit() {
        await this.loadData()
    }

    async closeMenu() {
        await this.menuController.close()
    }


    async logout() {
        await this.authenticationService.logout()
    }

    async loadData() {
        this.user = await this.userService.getLoggedUser()
        Preferences.get({key: 'active'}).then(async value => {
            if (value.value && !Number.isNaN(value.value)) {
                const id = parseInt(value.value)
                this.activeCache = await this.cacheService.getCacheById(id);
                this.statistiche = <Stats>this.user.completed.find(stat => stat.cacheId === id)
            } else {
                this.activeCache = null
                this.statistiche = null
            }
        })
    }
}
