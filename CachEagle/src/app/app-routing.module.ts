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
    path: 'sections/search',
    loadChildren: () => import('./pages/sections/search/search.module').then(m => m.SearchPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sections/favorites',
    loadChildren: () => import('./pages/sections/favorites/favorites.module').then(m => m.FavoritesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sections/completed',
    loadChildren: () => import('./pages/sections/completed/completed.module').then(m => m.CompletedPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sections/mycache',
    loadChildren: () => import('./pages/sections/mycache/mycache.module').then(m => m.MycachePageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
