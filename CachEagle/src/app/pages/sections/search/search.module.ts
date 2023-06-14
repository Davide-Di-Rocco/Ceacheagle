import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SearchPage} from './search.page';
import {SearchPageRoutingModule} from "./search-routing.module";
import {AppComponentsModule} from "../../../components/app.components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    AppComponentsModule
  ],
  declarations: [SearchPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchPageModule {

}
