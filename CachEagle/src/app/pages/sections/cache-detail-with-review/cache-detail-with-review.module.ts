import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CacheDetailWithReviewPageRoutingModule } from './cache-detail-with-review-routing.module';

import { CacheDetailWithReviewPage } from './cache-detail-with-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CacheDetailWithReviewPageRoutingModule
  ],
  declarations: [CacheDetailWithReviewPage]
})
export class CacheDetailWithReviewPageModule {}
