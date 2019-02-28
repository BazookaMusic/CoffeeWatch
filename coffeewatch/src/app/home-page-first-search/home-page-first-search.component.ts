/// <reference types="@types/googlemaps" />
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { CoffeeshopsService } from '../coffeeshops.service';

import { CoffeeShop } from '../coffee-shop';
import { coffeeCategories } from '../coffee';

@Component({
  selector: 'app-home-page-first-search',
  templateUrl: './home-page-first-search.component.html',
  styleUrls: ['./home-page-first-search.component.css']
})

export class HomePageFirstSearchComponent implements OnInit
{
  selected = 0;
  categories = [];

  centerlat: number;
  centerlng: number;
  public searchControl: FormControl;
  userlat: number;
  userlng: number;
  markers: [number, number][];

  coffeeShops: CoffeeShop[];
  selectedCoffeeShop: number;

  autocomplete: google.maps.places.Autocomplete;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private coffeeShopsService: CoffeeshopsService
  ) { }

  ngOnInit() {
    this.userlat = undefined;
    this.userlng = undefined;
    this.centerlat = 37.982038;
    this.centerlng = 23.730271;

    this.loadAutocomplete();
  }

  loadAutocomplete() {
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});

      this.autocomplete.addListener("place_changed", () => this.getPlace());
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.userlat = position.coords.latitude;
        this.userlng = position.coords.longitude;
        this.centerlat = position.coords.latitude;
        this.centerlng = position.coords.longitude;

        this.coffeeShopsService.setSearchLocation(this.userlat, this.userlng);
        this.coffeeShopsService.updateCoffeeShops(this.userlat, this.userlng);
        this.coffeeShopsService.setIsUserLocationRequested(true);
      });
    }
    else {
      alert("Cannot return position");
    }
  }

  getPlace() {
    this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

      //verify result
      if (place.geometry === undefined || place.geometry === null) return;

      //set latitude, longitude and zoom
      this.userlat = place.geometry.location.lat();
      this.userlng = place.geometry.location.lng();
      this.centerlat = this.userlat;
      this.centerlng = this.userlng;
      this.coffeeShopsService.setSearchLocation(this.userlat, this.userlng);
      this.coffeeShopsService.updateCoffeeShops(this.userlat, this.userlng);
      this.coffeeShopsService.setIsUserLocationRequested(false);
    });
  }
  
  select(index: number)
  {
    this.selected = index;
    const filters = this.coffeeShopsService.getFilters();
    filters.category = coffeeCategories[index];
    this.coffeeShopsService.setFilters(filters);
    console.log(filters);
  }
}
