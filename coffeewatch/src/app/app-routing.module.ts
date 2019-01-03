import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeShopFullComponent } from './coffee-shop-full/coffee-shop-full.component';
import { CoffeeShopListComponent } from './coffee-shop-list/coffee-shop-list.component';
import { SearchMapComponent } from './search-map/search-map.component';

const routes: Routes = 
[
    { path: '', component: CoffeeShopListComponent, outlet: "coffeeShopView" },
    { path: 'coffeeShop/:id', component: CoffeeShopFullComponent, outlet: "coffeeShopView" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
