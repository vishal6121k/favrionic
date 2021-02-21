import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { NoauthGuard } from "./guards/noauth.guard";
import { RoleGuardService } from "./services/role-guard.service";
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoauthGuard]
  },
  {
    path: 'choose',
    loadChildren: () => import('./choose/choose.module').then( m => m.ChoosePageModule)
    // canActivate: [RoleGuardService]
  },
  {
    path: 'shopper',
    loadChildren: () => import('./shopper/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'saved',
    loadChildren: () => import('./saved/saved.module').then( m => m.SavedPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shopper/home',
    loadChildren: () => import('./shopper/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  }
  ,
  {
    path: 'shopper/home/:comm',
    loadChildren: () => import('./shopper/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shopper/favr',
    loadChildren: () => import('./shopper/favr/favr.module').then( m => m.FavrPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shopper/orders',
    loadChildren: () => import('./shopper/orders/orders.module').then( m => m.OrdersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shopper/cart',
    loadChildren: () => import('./shopper/cart/cart.module').then( m => m.CartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shopper/seldrop/:id',
    loadChildren: () => import('./shopper/seldrop/seldrop.module').then( m => m.SeldropPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shopper/track/:id',
    loadChildren: () => import('./shopper/track/track.module').then( m => m.TrackPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shopper/rate',
    loadChildren: () => import('./shopper/rate/rate.module').then( m => m.RatePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dropper',
    loadChildren: () => import('./dropper/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dropper/home',
    loadChildren: () => import('./dropper/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dropper/favr',
    loadChildren: () => import('./dropper/favr/favr.module').then( m => m.FavrPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dropper/orders',
    loadChildren: () => import('./dropper/orders/orders.module').then( m => m.OrdersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dropper/start/:id',
    loadChildren: () => import('./dropper/start/start.module').then( m => m.StartPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dropper/track/:id',
    loadChildren: () => import('./dropper/track/track.module').then( m => m.TrackPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'pages/:page_type',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
