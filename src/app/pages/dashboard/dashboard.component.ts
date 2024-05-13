import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../service/entities/products_entity';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  @ViewChild('addProductModal') addProductModal!: ElementRef;
  @ViewChild('updateProductModal') updateProductModal!: ElementRef;
  @ViewChild('deleteProductModal') deleteProductModal!: ElementRef;

  products: Product[] = [];

  createProductObj: CreateProduct;
  updateProductObj: UpdateProduct;

  constructor(private productsService: ProductsService) {
    this.createProductObj = new CreateProduct();
    this.updateProductObj = new UpdateProduct();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (products: any) => {
        const inverseProducts = products.reverse();
        this.products = inverseProducts;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
    });
  }

  addProduct() {
    const newProduct: Product = {
      SKU: this.createProductObj.SKU,
      Handle: this.createProductObj.Handle,
      Title: this.createProductObj.Title,
      Description: this.createProductObj.Description,
      Grams: this.createProductObj.Grams,
      Stock: this.createProductObj.Stock,
      Price: this.createProductObj.Price,
      'Compare Price': this.createProductObj.ComparePrice,
      Barcode: this.createProductObj.Barcode,
    };

    this.productsService.createProduct(newProduct).subscribe({
      next: (product: any) => {
        this.products.unshift(product);
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      },
    });
  }

  updateProduct() {
    const updatedProduct: Product = {
      SKU: this.updateProductObj.SKU,
      Handle: this.updateProductObj.Handle,
      Title: this.updateProductObj.Title,
      Description: this.updateProductObj.Description,
      Grams: this.updateProductObj.Grams,
      Stock: this.updateProductObj.Stock,
      Price: this.updateProductObj.Price,
      'Compare Price': this.updateProductObj.ComparePrice,
      Barcode: this.updateProductObj.Barcode,
    };

    this.productsService.updateProduct(updatedProduct).subscribe({
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

  selectedProductToUpdate(product: Product) {
    this.updateProductObj = {
      SKU: product.SKU,
      Handle: product.Handle,
      Title: product.Title,
      Description: product.Description,
      Grams: product.Grams,
      Stock: product.Stock,
      Price: product.Price,
      ComparePrice: product['Compare Price'],
      Barcode: product.Barcode,
    };
  }

  deleteProduct(productSKU: number) {
    const productToDelete = this.products.find((p) => p.SKU === productSKU);

    if (productToDelete) {
      this.productsService
        .deleteProduct(productToDelete.SKU.toString())
        .subscribe({
          next: () => {
            this.products = this.products.filter((p) => p.SKU !== productSKU);
          },
          error: (error: any) => {
            console.error('There was an error!', error);
            alert('There was an error deleting the product');
          },
        });
    }
  }
}

export class CreateProduct {
  SKU: number;
  Handle: string;
  Title: string;
  Description: string;
  Grams: number;
  Stock: number;
  Price: number;
  ComparePrice: number;
  Barcode: number;
  constructor() {
    this.SKU = 0;
    this.Handle = '';
    this.Title = '';
    this.Description = '';
    this.Grams = 0;
    this.Stock = 0;
    this.Price = 0;
    this.ComparePrice = 0;
    this.Barcode = 0;
  }
}

export class UpdateProduct {
  SKU: number;
  Handle: string;
  Title: string;
  Description: string;
  Grams: number;
  Stock: number;
  Price: number;
  ComparePrice: number;
  Barcode: number;
  constructor() {
    this.SKU = 0;
    this.Handle = '';
    this.Title = '';
    this.Description = '';
    this.Grams = 0;
    this.Stock = 0;
    this.Price = 0;
    this.ComparePrice = 0;
    this.Barcode = 0;
  }
}
