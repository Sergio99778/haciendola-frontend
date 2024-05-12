import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../service/entities/products_entity';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (products: any) => {
        this.products = products;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
    });
  }

  addProduct() {
    const newProduct: Product = {
      SKU: 12345,
      Handle: 'product_handle',
      Title: 'Product Title',
      Description: 'Product Description',
      Grams: 500,
      Stock: 100,
      Price: 19.99,
      'Compare Price': 24.99,
      Barcode: 9876543210,
    };
    this.productsService.createProduct(newProduct).subscribe({
      next: (product: any) => {
        this.products.push(product);
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
    });
  }

  updateProduct(product: Product) {
    this.productsService
      .updateProduct(product.SKU.toString(), product)
      .subscribe({
        next: (updatedProduct: any) => {
          const index = this.products.findIndex(
            (p) => p.SKU === updatedProduct.SKU
          );
          this.products[index] = updatedProduct;
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        },
      });
  }

  deleteProduct(productSKU: number) {
    this.productsService.deleteProduct(productSKU.toString()).subscribe({
      next: () => {
        const productToDelete = this.products.find((p) => p.SKU === productSKU);

        if (productToDelete) {
          this.productsService
            .deleteProduct(productToDelete.SKU.toString())
            .subscribe({
              next: () => {
                this.products = this.products.filter(
                  (p) => p.SKU !== productSKU
                );
              },
              error: (error: any) => {
                console.error('There was an error!', error);
                alert('There was an error deleting the product');
              },
            });
        }
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
    });
  }
}
