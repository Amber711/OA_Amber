import { Routes, RouterModule} from '@angular/router';
import { ProductsComponent} from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'shopping-bag',
    component: ShoppingCartComponent
  },
  {
    path: '**',
    redirectTo: 'products',
  }
];

export const routing = RouterModule.forRoot(routes);
