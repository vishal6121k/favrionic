import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';

import { LoccarttComponent } from '../loccartt/loccartt.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    OrdersPageRoutingModule
  ],
  declarations: [OrdersPage, LoccarttComponent]
})
export class OrdersPageModule {}
