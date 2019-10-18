import {Component, Inject, OnInit} from '@angular/core';
import { Product } from '../../models/product.model';
import {Action} from '../../models/Enums';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less']
})
export class ShoppingCartComponent implements OnInit {
  productList: Product[];
  constructor(@Inject('data') private data) { }

  ngOnInit() {
    this.getProductsForShoppingBag();
  }

  private getProductsForShoppingBag() {
    this.productList = this.data.getProductsForShoppingBag();
  }

  quantityChangeHandler(e: any, index: number) {
      this.updateStockWithQuantity(e.action, index);
      this.updateProductById(e.product.id, e.action === Action.Increment ? 1 : -1).then(res => {
        if (this.productList[index].quantity === 0) {
          this.productList.splice(index, 1);
        }
      }, error => {
        // Revert change;
        this.updateStockWithQuantity(e.action === Action.Increment ? Action.Decrement : Action.Increment, index);
      });
  }

  removeItem(index: number) {
   this.removeProductFromCart(this.productList[index].id).then(res => {
     this.productList.splice(index, 1);
   });
  }

  private updateStockWithQuantity(action: string, index: number) {
    const productCopy = Object.assign({}, this.productList[index]);
    if (action === Action.Increment) {
      if (productCopy.availability === 0) return;

      productCopy.quantity += 1;
      productCopy.availability -= 1;
      this.productList[index] = productCopy;
    } else {
      if (productCopy.quantity === 0) return;
      productCopy.quantity -= 1;
      productCopy.availability += 1;
      this.productList[index] = productCopy;
    }
  }

  updateProductById(id: number, delta: number): Promise<any> {
   return this.data.updateProductById(id, delta);
  }

  removeProductFromCart(id: number): Promise<any> {
    return this.data.removeItemFromShoppingCart(id);
  }


}
