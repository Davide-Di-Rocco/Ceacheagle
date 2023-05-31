import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CacheDetailWithStatsPage } from './cache-detail-with-stats.page';

const routes: Routes = [
  {
    path: '',
    component: CacheDetailWithStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CacheDetailWithStatsPageRoutingModule {}
