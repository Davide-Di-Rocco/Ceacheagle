import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycachePageRoutingModule } from './mycache-routing.module';

import { MycachePage } from './mycache.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycachePageRoutingModule
  ],
  declarations: [MycachePage]
})
export class MycachePageModule {}
