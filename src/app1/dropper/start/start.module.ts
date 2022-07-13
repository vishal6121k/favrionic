import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { AgmDirectionModule } from 'agm-direction';

import { StartPageRoutingModule } from './start-routing.module';

import { AgmCoreModule } from '@agm/core';
import { StartPage } from './start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    AgmCoreModule.forRoot({
        apiKey: "AIzaSyC7RAT2MhwmKUqs2kEWuQjmka65lv6dYxY" + '&libraries=visualization'
    }),
    AgmDirectionModule,
    StartPageRoutingModule
  ],
  declarations: [StartPage]
})
export class StartPageModule {}
