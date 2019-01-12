import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeShopFullComponent } from './coffee-shop-full/coffee-shop-full.component';
import { CoffeeShopListComponent } from './coffee-shop-list/coffee-shop-list.component';
import { CoffeeReviewsComponent } from './coffee-reviews/coffee-reviews.component';
import { CoffeeStatisticsComponent } from './coffee-statistics/coffee-statistics.component';
import { CoffeeDescriptionComponent } from './coffee-description/coffee-description.component';
import { CoffeeShopMediumComponent } from './coffee-shop-medium/coffee-shop-medium.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = 
[
    { path: 'home', component: HomePageComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'coffeeShopFull/:coffeeShopID', component: CoffeeShopFullComponent,
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
