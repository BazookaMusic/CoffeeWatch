import { Injectable } from '@angular/core';
import {CoffeeShop} from "./coffee-shop";
import { Observable, of } from 'rxjs';


import {Coffee} from "./coffee";
import {Review} from "./review";

@Injectable({
  providedIn: 'root'
})
export class CoffeeshopsService {

  coffeeShops: CoffeeShop[] = [];
  coffeeShop: CoffeeShop;

  coffees: Coffee[] = [];
  coffee: Coffee;
  reviews:Review[] = [];
  mapCoffeeShops:Observable<[CoffeeShop[],number]>; //coffeeshops, selected index
  public searchLat:number;
  public searchLng:number;
  selectedCoffeeShop:number;
  markers: [number,number][];



  constructor() 
  {
    this.mockData();
    this.selectedCoffeeShop=undefined;
    this.selectCoffeeShop(undefined);
  };

  mockData()
  {
    this.coffee = new Coffee(1, "Freddo Cappuccino latte mocha maciato", "../assets/cap.jpg", 2.80, 4.7, 14, this.reviews);
    

    var i: number;
    for(i = 0; i < 5; i++)
    {
      this.coffees.push(this.coffee);
    }
  
    this.coffeeShops[0] = new CoffeeShop(1, "Mikel", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikel.gr", "1234567890",37.976703, 23.726184, this.coffees);
    this.coffeeShops[1] = new CoffeeShop(2, "CoffeeShop2", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikel.gr", "1234567890", 37.976607, 23.726367,this.coffees);
    this.coffeeShops[2] = new CoffeeShop(3, "CoffeeShop3", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikel.gr", "1234567890",37.977021, 23.727494, this.coffees);

  }

  

  getCoffeeShop(id: number): Observable<CoffeeShop>
  {
    this.coffeeShop= this.coffeeShops.find(cs => cs.id == id);
    return of(this.coffeeShop);
  }

  selectCoffeeShop(selectedIndex:number)
  {
    this.selectedCoffeeShop=selectedIndex;
  }

  getSelectedCoffeeShop()
  {
    return this.selectedCoffeeShop;
  }

  getCoffeeShops()
  {
    return of(this.coffeeShops);
  }

  getMarkers()
  {
    this.markers=this.coffeeShops.map((cs):[number,number] => [cs.lat,cs.lng]);
    return of(this.markers);
  }

  setSearchLocation(lat:number,lng:number)
  {
    this.searchLat=lat;
    this.searchLng=lng;
  }


}
