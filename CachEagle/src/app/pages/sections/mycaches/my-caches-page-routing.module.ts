import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCachesPage } from './my-caches-page.component';

const routes: Routes = [
  {
    path: '',
    component: MyCachesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycachesPageRoutingModule {}
