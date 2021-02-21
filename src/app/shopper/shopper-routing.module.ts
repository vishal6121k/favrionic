import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopperPage } from './shopper.page';

const routes: Routes = [
  // {
    // path: '',
    // component: ShopperPage,
    // children: [
      // {
      //   path: '',
      //   redirectTo: 'home',
      //   pathMatch: 'full'
      // },
      // {
      //   path: 'home',
      //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      // }
      // ,
      // {
      //   path: 'home/:comm',
      //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      // },
      // {
      //   path: 'favr',
      //   loadChildren: () => import('./favr/favr.module').then( m => m.FavrPageModule)
      // },
      // {
      //   path: 'orders',
      //   loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
      // },
      // {
      //   path: 'cart',
      //   loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
      // },
      // {
      //   path: 'seldrop/:id',
      //   loadChildren: () => import('./seldrop/seldrop.module').then( m => m.SeldropPageModule)
      // },
      // {
      //   path: 'track/:id',
      //   loadChildren: () => import('./track/track.module').then( m => m.TrackPageModule)
      // },
      // {
      //   path: 'rate',
      //   loadChildren: () => import('./rate/rate.module').then( m => m.RatePageModule)
      // }
    // ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopperPageRoutingModule {}
