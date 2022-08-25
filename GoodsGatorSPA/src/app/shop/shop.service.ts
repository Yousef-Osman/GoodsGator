import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../shared/interfaces/product';
import { Category } from '../shared/interfaces/category';
import { Brand } from '../shared/interfaces/brand';
import { Pagination } from '../shared/interfaces/pagination';
import { map } from 'rxjs';
import { PaginatedResponse } from '../shared/models/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = environment.apiUrl;
  paginatedResponse = new PaginatedResponse<Product[]>();

  constructor(private http: HttpClient) { }

  getProducts() {
    let params = new HttpParams();

    params = params.append('pageNumber', '1');
    params = params.append('pageSize', '6');
    params = params.append('categories', '2');
    params = params.append('categories', '3');
    params = params.append('brands', '1');
    params = params.append('brands', '2');

    return this.http.get<Product[]>(this.baseUrl + "products", { observe: 'response', params })
      .pipe(
        map(response => {
          this.paginatedResponse.body = response.body;
          let paginationHeader = response.headers.get('pagination');

          if (paginationHeader !== null)
            this.paginatedResponse.pagination = JSON.parse(paginationHeader);

          return this.paginatedResponse;
        })
      );
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + "products/brands");
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + "products/Categories");
  }
}
