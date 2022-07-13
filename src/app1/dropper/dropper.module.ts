import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropperPageRoutingModule } from './dropper-routing.module';

import { DropperPage } from './dropper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropperPageRoutingModule
  ],
  declarations: [DropperPage]
})
export class DropperPageModule {}
