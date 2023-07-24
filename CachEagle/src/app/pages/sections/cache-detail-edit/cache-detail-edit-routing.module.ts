import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CacheDetailEditPage} from './cache-detail-edit.page';
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";
import {AppComponentsModule} from "../../../components/app.components.module";

const routes: Routes = [
  {
    path: '',
    component: CacheDetailEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, NgIf, AppComponentsModule],
  exports: [RouterModule],
})
export class CacheDetailEditPageRoutingModule {
}
