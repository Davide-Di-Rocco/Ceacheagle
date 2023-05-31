import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CacheDetailWithStatsPageRoutingModule } from './cache-detail-with-stats-routing.module';

import { CacheDetailWithStatsPage } from './cache-detail-with-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CacheDetailWithStatsPageRoutingModule
  ],
  declarations: [CacheDetailWithStatsPage]
})
export class CacheDetailWithStatsPageModule {}
