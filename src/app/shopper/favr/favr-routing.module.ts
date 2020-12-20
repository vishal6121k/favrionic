import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavrPage } from './favr.page';

const routes: Routes = [
  {
    path: '',
    component: FavrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavrPageRoutingModule {}
