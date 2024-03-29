import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IBrand } from 'src/app/_shared/interfaces/iBrand';
import { ICategory } from 'src/app/_shared/interfaces/iCategory';
import { ProductParams } from 'src/app/_shared/models/product-params';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-sidebar-filters',
  templateUrl: './sidebar-filters.component.html',
  styleUrls: ['./sidebar-filters.component.scss']
})
export class SidebarFiltersComponent implements OnInit {

  brands: IBrand[];
  categories: ICategory[];
  filterParams = new ProductParams();
  @Output() filters = new EventEmitter<ProductParams>;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (data) => this.brands = data,
      error: (e) => console.log(e)
    });
  }

  getCategories() {
    this.shopService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (e) => console.log(e)
    });
  }

  onCategoryChange(categoryId: number) {
    this.filterParams.category = categoryId;
  }

  onBrandClick(target: any) {

    if (target.checked)
      this.filterParams.brands.push(target.value);
    else
      this.filterParams.brands = this.filterParams.brands.filter(el => el !== target.value);
  }

  applyFilters(){
    this.filters.emit(this.filterParams);
  }

  resetFilters(){
    this.filterParams = new ProductParams();
    this.filters.emit(this.filterParams);
    this.ngOnInit();
  }
}
