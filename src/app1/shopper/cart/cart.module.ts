import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { AgmCoreModule } from '@agm/core';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    AgmCoreModule.forRoot({
        apiKey: "AIzaSyC7RAT2MhwmKUqs2kEWuQjmka65lv6dYxY" + '&libraries=visualization'
    }),
    CartPageRoutingModule
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
