import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StarRatingModule } from 'angular-star-rating';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { AgmCoreModule } from '@agm/core';
import { NavComponent } from './nav/nav.component';
import { CoffeeShopListComponent } from './coffee-shop-list/coffee-shop-list.component';
import { CoffeeShopPreviewComponent } from './coffee-shop-preview/coffee-shop-preview.component';
import { CoffeeShopFullComponent } from './coffee-shop-full/coffee-shop-full.component';
import { CoffeeshopsService } from './coffeeshops.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CoffeeReviewsComponent } from './coffee-reviews/coffee-reviews.component';
import { CoffeeStatisticsComponent } from './coffee-statistics/coffee-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchMapComponent,
    NavComponent,
    CoffeeShopListComponent,
    CoffeeShopPreviewComponent,
    CoffeeShopFullComponent,
    CoffeeReviewsComponent,
    CoffeeStatisticsComponent
  ],
  imports: [
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
