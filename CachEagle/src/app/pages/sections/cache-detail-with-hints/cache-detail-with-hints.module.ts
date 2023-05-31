import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CacheDetailWithHintsPageRoutingModule } from './cache-detail-with-hints-routing.module';

import { CacheDetailWithHintsPage } from './cache-detail-with-hints.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CacheDetailWithHintsPageRoutingModule
  ],
  declarations: [CacheDetailWithHintsPage]
})
export class CacheDetailWithHintsPageModule {}
