import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';

@Component({
  selector: 'app-quantity-controls',
  templateUrl: './quantity-controls.component.html',
  styleUrls: ['./quantity-controls.component.less']
})
export class QuantityControlsComponent implements OnInit {
  @Input() disableDecrement: boolean;
  @Input() disableIncrement: boolean;
  @Output() changeQuantity: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onQuantityChange(action: string) {
    console.log('quantity control:', action);
    this.changeQuantity.emit(action);
  }

}
