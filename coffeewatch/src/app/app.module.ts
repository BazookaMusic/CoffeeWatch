import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchMapComponent } from './search-map/search-map.component';
import { AgmCoreModule } from '@agm/core';
import { NavComponent } from './nav/nav.component';
import { CoffeeShopListComponent } from './coffee-shop-list/coffee-shop-list.component';
import { CoffeeShopPreviewComponent } from './coffee-shop-preview/coffee-shop-preview.component';
import { CoffeeShopFullComponent } from './coffee-shop-full/coffee-shop-full.component';
import { CoffeeshopsService } from './coffeeshops.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchMapComponent,
    NavComponent,
    CoffeeShopListComponent,
    CoffeeShopPreviewComponent,
    CoffeeShopFullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAiQq3g4B24gFkVps1sIM4TTHLSqs6XSFI'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
