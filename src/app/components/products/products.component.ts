import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product.model';
import { Action } from '../../models/Enums';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  enableGoToBagBtn = false;
  constructor(@Inject('data') private data,
              private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void {
    this.products = this.data.getProducts().slice();
  }

  quantityChangeHandler(e: any, index: number): void {
    if (e && e.action === Action.Increment) {
      this.increment(index);
    } else if (e && e.action === Action.Decrement) {
      this.decrement(index);
    }
  }

  onItemSelected(product: Product, e: any): void {
    product.checked = e.target.checked;
    // if item is deselected
    this.enableGoToBagBtn = this.products.filter(p => p.checked && p.quantity > 0).length > 0;

  }

  goToShoppingBag() {
    this.updateStock().then((res) => {
      this.router.navigate(['/shopping-bag']);
    });
  }

  private increment(index: number): void {
    const productCopy = Object.assign({}, this.products[index]);
    if (productCopy.availability === 0) return;

    productCopy.quantity += 1;
    productCopy.availability -= 1;
    this.products[index] = productCopy;
    // Enable go to bag button;
    if (this.products[index].checked) {
      this.enableGoToBagBtn = true;
    }
  }

  private decrement(index: number): void {
    const productCopy = Object.assign({}, this.products[index]);
    if (productCopy.quantity === 0) return;
    productCopy.quantity -= 1;
    productCopy.availability += 1;
    this.products[index] = productCopy;
  }

  private updateStock(): Promise<any> {
    const selectedProducts = this.products.filter(p => p.checked);
    return this.data.stockBulkUpdate(selectedProducts);
  }

}
