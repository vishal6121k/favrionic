import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../icon/icon.module';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { LoccartComponent } from '../shopper/loccart/loccart.component';

import { LoccarttComponent } from '../dropper/loccartt/loccartt.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, LoccartComponent, LoccarttComponent]
})
export class ProfilePageModule {}
