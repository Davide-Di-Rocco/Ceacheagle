import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RatingComponent} from "./rating/rating.component";
import {CacheItemListComponent} from "./cache-item-list/cache-item-list.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [RatingComponent, CacheItemListComponent],
  exports: [RatingComponent, CacheItemListComponent]
})

export class AppComponentsModule {
}
