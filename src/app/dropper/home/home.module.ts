import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';

import { HomePageRoutingModule } from './home-routing.module';

import { LongPressDirective } from '../../long-press.directive';
import { MomentModule } from 'ngx-moment';

import { HomePage } from './home.page';
// import { LoccarttComponent } from '../loccartt/loccartt.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    MomentModule,
    AgmCoreModule.forRoot({
        apiKey: "AIzaSyC7RAT2MhwmKUqs2kEWuQjmka65lv6dYxY" + '&libraries=visualization'
    }),
    HomePageRoutingModule
  ],
  declarations: [HomePage, LongPressDirective]
})
export class HomePageModule {}
