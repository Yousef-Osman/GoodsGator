import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/shared/interfaces/brand';
import { Category } from 'src/app/shared/interfaces/category';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-sidebar-filters',
  templateUrl: './sidebar-filters.component.html',
  styleUrls: ['./sidebar-filters.component.scss']
})
export class SidebarFiltersComponent implements OnInit {

  brands: Brand[];
  categories: Category[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    
    this.shopService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error:(e)=> console.log(e),
      complete: () => console.log('complete') 
    });
    
    this.shopService.getBrands().subscribe({
      next: (data) => this.brands = data,
      error:(e)=> console.log(e),
      complete: () => console.log('complete') 
    });
  }
}
