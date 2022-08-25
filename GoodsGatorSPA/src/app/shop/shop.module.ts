import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarFiltersComponent } from './sidebar-filters/sidebar-filters.component';



@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    SidebarFiltersComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
