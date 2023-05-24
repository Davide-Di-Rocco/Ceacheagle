import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycachePage } from './mycache.page';

const routes: Routes = [
  {
    path: '',
    component: MycachePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycachePageRoutingModule {}
