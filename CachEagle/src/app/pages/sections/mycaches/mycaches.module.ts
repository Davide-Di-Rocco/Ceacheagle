import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycachesPageRoutingModule } from './mycaches-routing.module';

import { MycachesPage } from './mycaches.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycachesPageRoutingModule
  ],
  declarations: [MycachesPage]
})
export class MycachesPageModule {}
