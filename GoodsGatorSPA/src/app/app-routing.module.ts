import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestErrorComponent } from './_shared/components/test-error/test-error.component';
import { ErrorsComponent } from './_shared/components/errors/errors.component';

const routes: Routes = [
  { path: 'products', loadChildren: () => import('./_shop/shop.module').then(mod => mod.ShopModule) },
  { path: 'cart', loadChildren: () => import('./_shopping-cart/shopping-cart.module').then(mod => mod.ShoppingCartModule) },
  { path: 'checkout', loadChildren: () => import('./_checkout/checkout.module').then(mod => mod.CheckoutModule) },
  { path: 'account', loadChildren: () => import('./_account/account.module').then(mod => mod.AccountModule) },
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
