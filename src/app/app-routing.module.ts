import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./screens/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'categories/:id/:name',
    loadChildren: () => import('./screens/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'more',
    loadChildren: () => import('./screens/more/more.module').then(m => m.MorePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
