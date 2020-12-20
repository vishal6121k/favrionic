import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeldropPage } from './seldrop.page';

const routes: Routes = [
  {
    path: '',
    component: SeldropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeldropPageRoutingModule {}
