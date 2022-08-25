import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/interfaces/product';
import { Category } from '../shared/interfaces/category';
import { Brand } from '../shared/interfaces/brand';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.baseUrl + "products");
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + "products/brands");
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + "products/Categories");
  }
}
