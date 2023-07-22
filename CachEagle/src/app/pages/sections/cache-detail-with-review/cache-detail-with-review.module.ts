import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CacheDetailWithReviewPageRoutingModule} from './cache-detail-with-review-routing.module';

import {CacheDetailWithReviewPage} from './cache-detail-with-review.page';
import {AppComponentsModule} from "../../../components/app.components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CacheDetailWithReviewPageRoutingModule,
    AppComponentsModule
  ],
  declarations: [CacheDetailWithReviewPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CacheDetailWithReviewPageModule {
}
