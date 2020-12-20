import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';

import { SeldropPageRoutingModule } from './seldrop-routing.module';

import { SeldropPage } from './seldrop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    SeldropPageRoutingModule
  ],
  declarations: [SeldropPage]
})
export class SeldropPageModule {}
