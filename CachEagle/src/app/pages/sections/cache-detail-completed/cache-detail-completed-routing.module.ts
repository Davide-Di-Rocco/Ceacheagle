import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CacheDetailCompletedPage } from './cache-detail-completed.page';

const routes: Routes = [
  {
    path: '',
    component: CacheDetailCompletedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CacheDetailCompletedPageRoutingModule {}
