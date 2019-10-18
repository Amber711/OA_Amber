import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';

import { DataService } from './services/data.service';
import { ProductComponent } from './components/products/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { QuantityControlsComponent } from './widgets/quantity-controls/quantity-controls.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    ShoppingCartComponent,
    QuantityControlsComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [{
    provide: 'data',
    useClass: DataService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
