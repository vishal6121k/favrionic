import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconModule } from '../../icon/icon.module';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// import { environment } from '../../../environments/environment';

import { TrackPageRoutingModule } from './track-routing.module';

import { TrackPage } from './track.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconModule,
    // AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot({
        apiKey: "AIzaSyC7RAT2MhwmKUqs2kEWuQjmka65lv6dYxY" + '&libraries=visualization'
    }),
    AgmDirectionModule,
    TrackPageRoutingModule
  ],
  declarations: [TrackPage]
})
export class TrackPageModule {}
