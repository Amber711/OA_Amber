import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() changeQuantity: EventEmitter<object> = new EventEmitter<object>();
  disableIncrement: boolean;
  disableDecrement: boolean;
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.product && changes.product.currentValue) {
      this.disableIncrement = changes.product.currentValue.availability <= 0;
      this.disableDecrement = changes.product.currentValue.quantity  === 0;
    }
  }

  changeItemQuantity(item: Product, e: string) {
    this.changeQuantity.emit({product: item, action: e});
  }

}
