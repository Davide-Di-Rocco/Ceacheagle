import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycachesPageRoutingModule } from './my-caches-page-routing.module';

import { MyCachesPage } from './my-caches-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycachesPageRoutingModule
  ],
  declarations: [MyCachesPage]
})
export class MycachesPageModule {}
