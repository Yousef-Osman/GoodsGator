import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { Product } from '../_shared/interfaces/product';
import { Brand } from '../_shared/interfaces/brand';
import { Category } from '../_shared/interfaces/category';
import { ProductParams } from '../_shared/models/product-params';
import { PaginatedResponse } from '../_shared/models/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = environment.apiUrl;
  paginatedResponse = new PaginatedResponse<Product[]>();

  constructor(private http: HttpClient) { }

  getProducts(productParams: ProductParams) {
    let params = this.setQueryParames(productParams);

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

  getProduct(id:string) {
    return this.http.get<Product>(this.baseUrl + "products/" + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + "products/brands");
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + "products/Categories");
  }

  setQueryParames(productParams: ProductParams): HttpParams {
    let params = new HttpParams();

    params = params.append('pageNumber', productParams.pageNumber.toString());
    params = params.append('pageSize', productParams.pageSize.toString());
    params = (productParams.orderBy) ? params.append('orderBy', productParams.orderBy) : params;
    params = (productParams.searchValue) ? params.append('searchValue', productParams.searchValue) : params;
    params = (productParams.category > 0) ? params.append('CategoryId', productParams.category.toString()) : params;

    if (productParams.brands.length > 0)
      productParams.brands.forEach(b => params = params.append('brands', b.toString()));

    return params;
  }
}