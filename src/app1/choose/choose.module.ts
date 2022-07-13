import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../icon/icon.module';

import { ChoosePageRoutingModule } from './choose-routing.module';

import { ChoosePage } from './choose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    ChoosePageRoutingModule
  ],
  declarations: [ChoosePage]
})
export class ChoosePageModule {}
