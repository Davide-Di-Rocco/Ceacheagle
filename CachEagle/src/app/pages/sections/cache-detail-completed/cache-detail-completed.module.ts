import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CacheDetailCompletedPageRoutingModule } from './cache-detail-completed-routing.module';

import { CacheDetailCompletedPage } from './cache-detail-completed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CacheDetailCompletedPageRoutingModule
  ],
  declarations: [CacheDetailCompletedPage]
})
export class CacheDetailCompletedPageModule {}
