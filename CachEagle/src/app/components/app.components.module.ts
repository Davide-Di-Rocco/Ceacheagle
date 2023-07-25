import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RatingComponent} from "./rating/rating.component";
import {CacheItemListComponent} from "./cache-item-list/cache-item-list.component";
import {PageSelectorComponent} from "./page-selector/page-selector.component";
import {ReviewComponent} from "./review/review.component";
import {HintComponent} from "./hint/hint.component";
import {MapComponent} from "./map/map.component";
import {ActiveCacheComponent} from "./active-cache/active-cache.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [RatingComponent, CacheItemListComponent, PageSelectorComponent, ReviewComponent, HintComponent, MapComponent, ActiveCacheComponent],
  exports: [RatingComponent, CacheItemListComponent, PageSelectorComponent, ReviewComponent, HintComponent, MapComponent, ActiveCacheComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponentsModule {
}
