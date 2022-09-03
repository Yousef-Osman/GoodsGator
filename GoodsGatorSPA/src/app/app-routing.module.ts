import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestErrorComponent } from './components/test-error/test-error.component';
import { ErrorsComponent } from './shared/components/errors/errors.component';

const routes: Routes = [
  { path: 'products', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule) },
  { path: 'testerror', component: TestErrorComponent },
  { path: 'error/:statusCode', component: ErrorsComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
