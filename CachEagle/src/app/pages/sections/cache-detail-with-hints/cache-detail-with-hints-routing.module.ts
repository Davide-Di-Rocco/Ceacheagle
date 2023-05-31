import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CacheDetailWithHintsPage } from './cache-detail-with-hints.page';

const routes: Routes = [
  {
    path: '',
    component: CacheDetailWithHintsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CacheDetailWithHintsPageRoutingModule {}
