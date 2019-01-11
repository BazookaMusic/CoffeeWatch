import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeShopFullComponent } from './coffee-shop-full/coffee-shop-full.component';
import { CoffeeShopListComponent } from './coffee-shop-list/coffee-shop-list.component';
import { CoffeeReviewsComponent } from './coffee-reviews/coffee-reviews.component';
import { CoffeeStatisticsComponent } from './coffee-statistics/coffee-statistics.component';
import { CoffeeDescriptionComponent } from './coffee-description/coffee-description.component';
import { CoffeeShopMediumComponent } from './coffee-shop-medium/coffee-shop-medium.component';

const routes: Routes = 
[
    { path: '', component: CoffeeShopListComponent, outlet: "contentView" },
    { path: 'coffeeShopMedium/:coffeeShopID', component: CoffeeShopMediumComponent, outlet: "coffeeShopMedium" },
    { path: 'coffeeShopFull/:coffeeShopID', component: CoffeeShopFullComponent, outlet: "contentView",
      children: 
      [
          { path: 'coffee/:coffeeID/description', component: CoffeeDescriptionComponent, outlet: "detailsView" },
          { path: 'coffee/:coffeeID/reviews', component: CoffeeReviewsComponent, outlet: "detailsView" },
          { path: 'coffee/:coffeeID/statistics', component: CoffeeStatisticsComponent, outlet: "detailsView" }
      ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
