import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CacheDetailActivatedPage } from './cache-detail-activated.page';

const routes: Routes = [
  {
    path: '',
    component: CacheDetailActivatedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CacheDetailActivatedPageRoutingModule {}
