import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewPageRoutingModule } from './review-routing.module';

import { ReviewPage } from './review.page';
import {AppComponentsModule} from "../../../components/app.components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReviewPageRoutingModule,
        AppComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [ReviewPage]
})
export class ReviewPageModule {}
