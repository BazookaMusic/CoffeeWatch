/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';

import { CoffeeshopsService } from '../coffeeshops.service';
import { CoffeeShop } from '../coffee-shop';

@Component({
  selector: 'app-search-map',
  templateUrl: './search-map.component.html',
  styleUrls: ['./search-map.component.css']
})

export class SearchMapComponent implements OnInit
{
  centerlat: number;
  centerlng: number;
  zoom:number;
  userlat:number = -1.0;
  userlng:number = -1.0;
  markers: [number,number][];

  coffeeShops:CoffeeShop[];
  selectedCoffeeShop:number;

  autocomplete: google.maps.places.Autocomplete;

  constructor(private coffeeShopsService:CoffeeshopsService) { }

  ngOnInit()
  {
    this.centerlat = 37.982038;
    this.centerlng = 23.730271;

    this.coffeeShopsService.getSearchLocation().subscribe(coordinates =>
      {
        if(coordinates == undefined)
        {
          this.centerlat = 37.982038;
          this.centerlng = 23.730271;
        }
        else
        {
          setTimeout(() => {
            this.centerlat = coordinates[0];
            this.centerlng = coordinates[1];
            this.userlat = coordinates[0];
            this.userlng = coordinates[1];
          }, 50);
        }
      });

    this.coffeeShopsService.getCoffeeShops().subscribe(cs =>
      {
        if(cs) this.markers = this.coffeeShopsService.getMarkers(cs)
      });
    this.watchCoffeeSelection();
  }

  watchCoffeeSelection()
  {
    //keep watch of coffeeShop selection by index
    this.coffeeShopsService.getSelectedCoffeeShop().subscribe(n => this.selectedCoffeeShop = n);
  }
}
