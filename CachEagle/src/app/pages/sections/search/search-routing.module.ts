import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchPage} from './search.page';
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";
import {AppComponentsModule} from "../../../components/app.components.module";


const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, NgIf, AppComponentsModule],
  exports: [RouterModule],
  declarations: []
})
export class SearchPageRoutingModule {
}
