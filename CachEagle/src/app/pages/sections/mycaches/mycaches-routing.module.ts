import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycachesPage } from './mycaches.page';

const routes: Routes = [
  {
    path: '',
    component: MycachesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycachesPageRoutingModule {}
