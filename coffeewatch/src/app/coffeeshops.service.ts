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

  coffees: Coffee[]=[];
  coffee: Coffee;
  reviews:Review[]=[];


  constructor() { };




  getCoffeeShops()
  {
    

    this.coffee = new Coffee(1, "Freddo Cappuccino latte mocha maciato", "../assets/cap.jpg", 2.80, 4.7, 14, this.reviews);

    var i:number;
    for (i=0;i<5;i++)
    {
      this.coffees.push(this.coffee);
    }

    
  

    this.coffeeShop = new CoffeeShop(1, "Mikel", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikel.gr", "1234567890", this.coffees);
  
    for (i=0;i<5;i++)
    {
      this.coffeeShops[i] = this.coffeeShop; 
    }

    console.log(this.coffeeShops[0].name);

    return of(this.coffeeShops);
  }

}
