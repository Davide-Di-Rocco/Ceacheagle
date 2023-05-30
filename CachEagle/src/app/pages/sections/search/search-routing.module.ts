import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SearchPage} from './search.page';
import {CacheItemListComponent} from "../../../components/cache-item-list/cache-item-list.component";
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";


const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule, NgIf],
  exports: [RouterModule, CacheItemListComponent],
  declarations: [CacheItemListComponent]
})
export class SearchPageRoutingModule {
}
