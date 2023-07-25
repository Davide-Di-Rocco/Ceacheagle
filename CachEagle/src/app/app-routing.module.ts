import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./services/authentication.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'section/search',
    loadChildren: () => import('./pages/sections/search/search.module').then(m => m.SearchPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'section/completed',
    loadChildren: () => import('./pages/sections/completed/completed.module').then(m => m.CompletedPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'section/favorites',
    loadChildren: () => import('./pages/sections/favorites/favorites.module').then(m => m.FavoritesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'section/mycaches',
    loadChildren: () => import('./pages/sections/mycaches/mycaches.module').then(m => m.MycachesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'section/creation',
    loadChildren: () => import('./pages/sections/creation/creation.module').then(m => m.CreationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sections/detail',
    loadChildren: () => import('./pages/sections/cache-detail-with-review/cache-detail-with-review.module').then(m => m.CacheDetailWithReviewPageModule)
  },
  {
    path: 'sections/review',
    loadChildren: () => import('./pages/sections/review/review.module').then(m => m.ReviewPageModule)
  },
  {
    path: 'sections/edit',
    loadChildren: () => import('./pages/sections/cache-detail-edit/cache-detail-edit.module').then(m => m.CacheDetailEditPageModule)
  },

  {
    path: 'sections/activated',
    loadChildren: () => import('./pages/sections/cache-detail-activated/cache-detail-activated.module').then( m => m.CacheDetailActivatedPageModule)
  },
  {
    path: 'sections/completed',
    loadChildren: () => import('./pages/sections/cache-detail-completed/cache-detail-completed.module').then( m => m.CacheDetailCompletedPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
