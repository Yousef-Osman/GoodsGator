import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component: ShoppingCartComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ShoppingCartRoutingModule { }
