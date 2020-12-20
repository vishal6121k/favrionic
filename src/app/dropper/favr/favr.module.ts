import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';

import { FavrPageRoutingModule } from './favr-routing.module';

import { LoccartComponent } from '../loccart/loccart.component';

import { FavrPage } from './favr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    FavrPageRoutingModule
  ],
  declarations: [FavrPage, LoccartComponent]
})
export class FavrPageModule {}
