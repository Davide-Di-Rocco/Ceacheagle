import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CreationPageRoutingModule} from './creation-routing.module';

import {CreationPage} from './creation.page';
import {AppComponentsModule} from "../../../components/app.components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreationPageRoutingModule,
    ReactiveFormsModule,
    AppComponentsModule
  ],
  declarations: [CreationPage]
})
export class CreationPageModule {
}
