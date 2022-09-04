import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass as fasMagnifyingGlass, faArrowRotateLeft as fasArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../_shared/interfaces/product';
import { Pagination } from '../_shared/interfaces/pagination';
import { ProductParams } from '../_shared/models/product-params';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: Product[];
  pagination: Pagination;
  productParams = new ProductParams();
  sortOptions = [
    { value: "", displayName: "Date: Latest First" },
    { value: "Price", displayName: "Price: Low to High" },
    { value: "PriceDesc", displayName: "Price: High to Low" }
  ]

  constructor(private shopService: ShopService, library: FaIconLibrary) {
    library.addIcons(fasMagnifyingGlass, fasArrowRotateLeft);
  }

  ngOnInit(): void {
    this.loadProducts(this.productParams);
  }

  loadProducts(params: ProductParams) {
    this.shopService.getProducts(params).subscribe({
      next: res => { this.products = res.body, this.pagination = res.pagination },
      error: (e) => console.log(e)
    });
  }

  onPageChanged(newPage) {
    this.productParams.pageNumber = newPage;
    this.loadProducts(this.productParams);
  }

  setFilters(filters:any) {
    this.productParams.brands = filters.brands;
    this.productParams.category = filters.category;
    this.productParams.searchValue = filters.searchValue;
    this.productParams.pageNumber = 1; //go to first page after applying filters
    this.loadProducts(this.productParams);
  }

  sortProducts(sortOption){
    this.productParams.orderBy = sortOption;
    this.productParams.pageNumber = 1; //go to first page after applying filters
    this.loadProducts(this.productParams);
  }

}
