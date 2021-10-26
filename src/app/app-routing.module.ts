import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'analise',
    loadChildren: () => import('./analise/analise.module').then( m => m.AnalisePageModule)
  },
  {
    path: 'tag',
    loadChildren: () => import('./tag/tag.module').then( m => m.TagPageModule)
  },
  {
    path: 'face',
    loadChildren: () => import('./face/face.module').then( m => m.FacePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
