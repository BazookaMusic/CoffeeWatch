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


  constructor() 
  {
    this.mockData();
  };

  mockData()
  {
    this.coffee = new Coffee(1, "Freddo Cappuccino latte mocha maciato", "../assets/cap.jpg", 2.80, 4.7, 14, this.reviews);
    

    var i: number;
    for(i = 0; i < 5; i++)
    {
      this.coffees.push(this.coffee);
    }
  
    this.coffeeShops[0] = new CoffeeShop(1, "Mikel", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikel.gr", "1234567890", this.coffees);
    this.coffeeShops[1] = new CoffeeShop(2, "CoffeeShop2", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikel.gr", "1234567890", this.coffees);
    this.coffeeShops[2] = new CoffeeShop(3, "CoffeeShop3", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikel.gr", "1234567890", this.coffees);

  }

  getCoffeeShop(id: number): Observable<CoffeeShop>
  {
    this.coffeeShop= this.coffeeShops.find(cs => cs.id == id);
    return of(this.coffeeShop);
  }

  getCoffeeShops()
  {
    

    return of(this.coffeeShops);
  }

}
