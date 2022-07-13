import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { AgmCoreModule } from '@agm/core';
import { LongPressDirective } from '../../long-press.directive';
import { MomentModule } from 'ngx-moment';

import { SeldropPageRoutingModule } from './seldrop-routing.module';

import { SeldropPage } from './seldrop.page';

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
    SeldropPageRoutingModule
  ],
  declarations: [SeldropPage, LongPressDirective]
})
export class SeldropPageModule {}
