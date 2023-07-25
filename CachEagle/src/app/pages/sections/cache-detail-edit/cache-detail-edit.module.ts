import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CacheDetailEditPageRoutingModule} from './cache-detail-edit-routing.module';

import {CacheDetailEditPage} from './cache-detail-edit.page';
import {AppComponentsModule} from "../../../components/app.components.module";
import {HammerModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CacheDetailEditPageRoutingModule,
    AppComponentsModule
  ],
  declarations: [CacheDetailEditPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CacheDetailEditPageModule {
}
