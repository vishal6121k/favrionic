import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../icon/icon.module';

import { ShopperPageRoutingModule } from './shopper-routing.module';

import { ShopperPage } from './shopper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    ShopperPageRoutingModule
  ],
  declarations: [ShopperPage]
})
export class ShopperPageModule {}
