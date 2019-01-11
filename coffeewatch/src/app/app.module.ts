import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { NavComponent } from './nav/nav.component';
import { CoffeeShopListComponent } from './coffee-shop-list/coffee-shop-list.component';
import { CoffeeShopSmallComponent } from './coffee-shop-small/coffee-shop-small.component';
import { CoffeeShopFullComponent } from './coffee-shop-full/coffee-shop-full.component';
import { CoffeeshopsService } from './coffeeshops.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CoffeeReviewsComponent } from './coffee-reviews/coffee-reviews.component';
import { CoffeeStatisticsComponent } from './coffee-statistics/coffee-statistics.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewReviewModalComponent } from './new-review-modal/new-review-modal.component';
import { NewPriceModalComponent } from './new-price-modal/new-price-modal.component';
import { CoffeeDescriptionComponent } from './coffee-description/coffee-description.component';
import { NewCoffeeModalComponent } from './new-coffee-modal/new-coffee-modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CoffeeShopMediumComponent } from './coffee-shop-medium/coffee-shop-medium.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NavComponent,
    CoffeeShopListComponent,
    CoffeeShopSmallComponent,
    CoffeeShopFullComponent,
    CoffeeReviewsComponent,
    CoffeeStatisticsComponent,
    NewReviewModalComponent,
    NewPriceModalComponent,
    CoffeeDescriptionComponent,
    NewCoffeeModalComponent,
    SearchBarComponent,
    CoffeeShopMediumComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAiQq3g4B24gFkVps1sIM4TTHLSqs6XSFI',
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    StarRatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
