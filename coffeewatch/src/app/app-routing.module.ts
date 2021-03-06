import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeShopFullComponent } from './coffee-shop-full/coffee-shop-full.component';
import { CoffeeShopListComponent } from './coffee-shop-list/coffee-shop-list.component';
import { CoffeeReviewsComponent } from './coffee-reviews/coffee-reviews.component';
import { CoffeeStatisticsComponent } from './coffee-statistics/coffee-statistics.component';
import { CoffeeDescriptionComponent } from './coffee-description/coffee-description.component';
import { CoffeeShopMediumComponent } from './coffee-shop-medium/coffee-shop-medium.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { NewCoffeeshopComponent } from './new-coffeeshop/new-coffeeshop.component';
import { SearchCoffeeShopComponent } from './search-coffee-shop/search-coffee-shop.component';
import { HomePageFirstSearchComponent } from './home-page-first-search/home-page-first-search.component';
import { HomePageSearchResultsComponent } from './home-page-search-results/home-page-search-results.component';

const routes: Routes = 
[
    { path: 'home', component: HomePageFirstSearchComponent},
    { path: 'searchResults', component: HomePageSearchResultsComponent },
    {path: 'login', component: LoginScreenComponent},
    {path: 'register', component: RegisterScreenComponent},
    { path: 'searchCoffeeShop', component: SearchCoffeeShopComponent },
    { path: 'newCoffeeShop', component: NewCoffeeshopComponent },
    { path: 'editCoffeeShop/:coffeeShopID', component: NewCoffeeshopComponent },
    { path: 'coffeeShop/:coffeeShopID', component: CoffeeShopFullComponent,
    children:
    [
        { path: 'coffee/:coffeeID/description', component: CoffeeDescriptionComponent, outlet: "detailsView" },
        { path: 'coffee/:coffeeID/reviews', component: CoffeeReviewsComponent, outlet: "detailsView" },
        { path: 'coffee/:coffeeID/statistics', component: CoffeeStatisticsComponent, outlet: "detailsView" }
    ] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
