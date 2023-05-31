import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CacheDetailWithReviewPage } from './cache-detail-with-review.page';

const routes: Routes = [
  {
    path: '',
    component: CacheDetailWithReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CacheDetailWithReviewPageRoutingModule {}
