import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
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

  createProduct(product: any) {
    return this.http.post(`${environment.api_base_url}/products`, product);
  }

  updateProduct(id: string, product: any) {
    return this.http.put(`${environment.api_base_url}/products/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.api_base_url}/products/${id}`);
  }
}
