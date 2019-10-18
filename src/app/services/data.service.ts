import { Injectable } from '@angular/core';
import { PRODUCTS } from '../mock-products';
import { Product} from '../models/product.model';

@Injectable()
export class DataService {

  constructor() { }

  getProducts(): Product[] {
    return PRODUCTS;
  }

  getProductsForShoppingBag(): Product[] {
    return PRODUCTS.filter(p => p.checked && p.quantity > 0);
  }

  stockBulkUpdate(products: Product[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const result = [];
      products.forEach(p => {
        if (p.checked) {
          PRODUCTS.forEach((product, index) => {
            if (p.id === product.id) {
              PRODUCTS[index] = p;
              result.push(p);
            }
          });
        }
      });
      resolve(result);
    });
  }

  updateProductById(id: number, delta: number): Promise<any> {
    return new Promise((resolve, reject) => {
      for (const p of PRODUCTS) {
        if (p.id === id) {
          if (delta < 0) {
            // Decrement purchase amount;
            p.quantity += delta;
            p.availability -= delta;
            if (p.quantity === 0) {p.checked = false}
            resolve(p);
          } else {
            // Increment purchase amount
            // Check if item is still in stock.
            if (p.availability >= delta) {
              p.quantity += delta;
              p.availability -= delta;
              resolve(p);
            } else {
              reject('Sorry, item is out of stock!');
            }
          }
        }
      }
    });
  }

  removeItemFromShoppingCart(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const found = PRODUCTS.find(p => p.id === id);
      if (found) {
        found.availability += found.quantity;
        found.quantity = 0;
        found.checked = false;
        resolve(found);
      } else {
        reject('item not found');
      }
    });
  }
}
