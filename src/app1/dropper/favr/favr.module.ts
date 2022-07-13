import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';

import { FavrPageRoutingModule } from './favr-routing.module';

// import { LoccarttComponent } from '../loccartt/loccartt.component';

import { FavrPage } from './favr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    FavrPageRoutingModule
  ],
  declarations: [FavrPage]
})
export class FavrPageModule {}
