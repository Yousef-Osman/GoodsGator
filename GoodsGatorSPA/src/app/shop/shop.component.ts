import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/interfaces/product';
import { Pagination } from '../shared/interfaces/pagination';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass as fasMagnifyingGlass, faArrowRotateLeft as fasArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { ProductParams } from '../shared/models/product-params';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: Product[];
  pagination: Pagination;
  productParams = new ProductParams();

  constructor(private shopService: ShopService, library: FaIconLibrary) {
    library.addIcons(fasMagnifyingGlass, fasArrowRotateLeft);
  }

  ngOnInit(): void {
    this.loadProducts(this.productParams);
  }

  loadProducts(params: ProductParams){
    this.shopService.getProducts(params).subscribe({
      next: (res) => {this.products = res.body, this.pagination = res.pagination},
      error:(e)=> console.log(e),
    });
  }

  pageChanged(newPage) {
    this.productParams.pageNumber = newPage;
    this.loadProducts(this.productParams);
  }

}

// import { Component, OnInit } from '@angular/core';
// import { ShopService } from './shop.service';
// import { Product } from '../shared/interfaces/product';
// import { Pagination } from '../shared/interfaces/pagination';
// import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
// import { faMagnifyingGlass as fasMagnifyingGlass, faArrowRotateLeft as fasArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
// import { ProductParams } from '../shared/models/product-params';

// @Component({
//   selector: 'app-shop',
//   templateUrl: './shop.component.html',
//   styleUrls: ['./shop.component.scss']
// })
// export class ShopComponent implements OnInit {

//   products: Product[];
//   pagination?: Pagination = {currentPage : 1, totalCount : 70, totalPages : 12, pageSize : 6};
//   productParams = new ProductParams();

//   constructor(private shopService: ShopService, library: FaIconLibrary) {
//     library.addIcons(fasMagnifyingGlass, fasArrowRotateLeft);
//   }

//   ngOnInit(): void {
//     this.loadProducts(this.productParams);
//   }

//   loadProducts(params: ProductParams) {
//     console.log(this.pagination.pageSize);
    
//     this.shopService.getProducts(params).subscribe({
//       next: (res) => {
//         console.log(res.body);
//         this.products = res.body,
//         this.products.concat(res.body),
//         this.products.concat(res.body),
//         this.products.concat(res.body),
//         this.products.concat(res.body),
//         this.products.concat(res.body),
//         this.products.concat(res.body),
//         this.products.concat(res.body),
//         this.products.concat(res.body),
//         this.products.concat(res.body)
//         console.log(res.body);
//       },
//       error: (e) => console.log(e),
//     });
//   }

//   pageChanged(newPage) {
//     this.productParams.pageNumber = newPage;
//     this.loadProducts(this.productParams);
//   }

// }

