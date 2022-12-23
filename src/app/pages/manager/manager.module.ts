import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ManagerComponent} from './manager.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/manager/products',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
      }
    ]
  }
];


@NgModule({
  declarations: [

    ManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ManagerModule {
}
