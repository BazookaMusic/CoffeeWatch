import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoffeeShopFullComponent } from './coffee-shop-full/coffee-shop-full.component';
import { CoffeeShopListComponent } from './coffee-shop-list/coffee-shop-list.component';
import { CoffeeReviewsComponent } from './coffee-reviews/coffee-reviews.component';
import { CoffeeStatisticsComponent } from './coffee-statistics/coffee-statistics.component';
import { CoffeeDescriptionComponent } from './coffee-description/coffee-description.component';
import { CoffeeShopMediumComponent } from './coffee-shop-medium/coffee-shop-medium.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { NewCoffeeshopComponent } from './new-coffeeshop/new-coffeeshop.component';

const routes: Routes = 
[
    { path: 'home', component: HomePageComponent},
    {path: 'login', component: LoginScreenComponent},
    {path: 'register', component: RegisterScreenComponent},
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
