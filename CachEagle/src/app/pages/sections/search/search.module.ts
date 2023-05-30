import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SearchPage} from './search.page';
import {RatingComponent} from "../../../components/rating/rating.component";
import {SearchPageRoutingModule} from "./search-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule
  ],
  declarations: [SearchPage, RatingComponent],
  exports: [RatingComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchPageModule {

}
