import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../icon/icon.module';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { LoccartComponent } from '../shopper/loccart/loccart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, LoccartComponent]
})
export class ProfilePageModule {}
