import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from './entities/products_entity';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${environment.api_base_url}/products`);
  }

  getProduct(id: string) {
    return this.http.get(`${environment.api_base_url}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.api_base_url}/products`, product);
  }

  updateProduct(product: Product) {
    return this.http.put(
      `${environment.api_base_url}/products/${product.SKU}`,
      product
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.api_base_url}/products/${id}`);
  }
}
