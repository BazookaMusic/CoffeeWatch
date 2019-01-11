/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';

import { CoffeeshopsService } from '../coffeeshops.service';
import { CoffeeShop } from '../coffee-shop';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit
{
  centerlat: number;
  centerlng: number;
  zoom: number;
  userlat: number;
  userlng: number;
  markers: [number, number][];

  coffeeShops: CoffeeShop[];
  selectedCoffeeShop: number;

  autocomplete: google.maps.places.Autocomplete;

  constructor(private coffeeShopsService:CoffeeshopsService) { }

  ngOnInit()
  {
    this.coffeeShopsService.getSearchLocation().subscribe(coordinates =>
      {
        if(coordinates == undefined)
        {
          this.userlat = -1.0;
          this.userlng = -1.0;
          setTimeout(() => {
            this.centerlat = 37.982038;
            this.centerlng = 23.730271;
          }, 50);
        }
        else
        {
          this.userlat = coordinates[0];
          this.userlng = coordinates[1];
          setTimeout(() => {
            this.centerlat = coordinates[0];
            this.centerlng = coordinates[1];
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
