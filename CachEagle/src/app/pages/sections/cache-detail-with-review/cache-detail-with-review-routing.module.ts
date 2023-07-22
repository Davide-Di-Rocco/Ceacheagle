import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CacheDetailWithReviewPage} from './cache-detail-with-review.page';
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";
import {AppComponentsModule} from "../../../components/app.components.module";

const routes: Routes = [
  {
    path: '',
    component: CacheDetailWithReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, NgIf, AppComponentsModule],
  exports: [RouterModule],
})
export class CacheDetailWithReviewPageRoutingModule {
}
