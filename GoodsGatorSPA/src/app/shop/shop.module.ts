import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarFiltersComponent } from './sidebar-filters/sidebar-filters.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    SidebarFiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
