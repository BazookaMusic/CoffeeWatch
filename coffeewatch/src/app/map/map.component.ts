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
  markers: [number, number, number][];
  zoomLevel: number;

  coffeeShops: CoffeeShop[];
  selectedCoffeeShop: number;

  autocomplete: google.maps.places.Autocomplete;

  constructor(private coffeeShopsService:CoffeeshopsService) { }

  ngOnInit()
  {
    this.zoomLevel = 13;
    this.userlat = undefined;
    this.userlng = undefined;
    this.centerlat = 37.982038;
    this.centerlng = 23.730271;

    this.coffeeShopsService.getSearchLocation().subscribe(coordinates =>
      {
        if(coordinates == undefined)
        {
          this.userlat = undefined;
          this.userlng = undefined;
          this.centerlat = 37.982038;
          this.centerlng = 23.730271;
          setTimeout(() => {
            this.centerlat = 37.982038;
            this.centerlng = 23.730271;
          }, 50);
        }
        else
        {
          setTimeout(() => {
            this.userlat = coordinates[0];
            this.userlng = coordinates[1];
            this.centerlat = coordinates[0];
            this.centerlng = coordinates[1];
          }, 50);
        }
      });

    this.coffeeShopsService.getCoffeeShops().subscribe(cs =>
      {
        if(cs) this.markers = this.coffeeShopsService.getMarkers(cs)
      });

    this.coffeeShopsService.getSelectedCoffeeShop().subscribe(id =>
      {
        this.selectedCoffeeShop = id;
        if (id !== undefined)
        {
          const selCoffeeShop = this.coffeeShopsService.coffeeShopDict[id];
          this.centerMap(selCoffeeShop.lat, selCoffeeShop.lng);
          this.zoomLevel = 17;
        }
        else
        {
          this.centerMap(this.userlat, this.userlng);
          this.zoomLevel = 13;
        }
    });
  }

  centerMap(lat: number, lng: number)
  {
    this.centerlat = lat;
    this.centerlng = lng;
    setTimeout(() => {
      this.centerlat = lat;
      this.centerlng = lng;
    }, 50);
  }

  markerClicked(marker)
  {
    this.centerMap(marker[1],marker[0]);
    this.zoomLevel = 18;
    this.coffeeShopsService.selectedCoffeeShop$.next(marker[0]);
  }
}
