import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CacheDetailActivatedPageRoutingModule } from './cache-detail-activated-routing.module';

import { CacheDetailActivatedPage } from './cache-detail-activated.page';
import {AppComponentsModule} from "../../../components/app.components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CacheDetailActivatedPageRoutingModule,
        AppComponentsModule
    ],
  declarations: [CacheDetailActivatedPage]
})
export class CacheDetailActivatedPageModule {}
