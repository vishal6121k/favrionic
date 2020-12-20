import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { LoccartComponent } from '../loccart/loccart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, LoccartComponent]
})
export class HomePageModule {}
