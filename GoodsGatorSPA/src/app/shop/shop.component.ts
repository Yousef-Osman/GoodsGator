import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/interfaces/product';
import { Pagination } from '../shared/interfaces/pagination';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass as fasMagnifyingGlass, faArrowRotateLeft as fasArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: Product[];
  pagination: Pagination;

  constructor(private shopService: ShopService, library: FaIconLibrary) {
    library.addIcons(fasMagnifyingGlass, fasArrowRotateLeft);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(){
    this.shopService.getProducts().subscribe({
      next: (res) => {this.products = res.body, this.pagination = res.pagination},
      error:(e)=> console.log(e),
      complete: () => console.log('complete') 
    });
  }

  pageChanged(event: any) {
    // this.producsParams.pageNumber = event.page;
    this.loadProducts();
  }

}
