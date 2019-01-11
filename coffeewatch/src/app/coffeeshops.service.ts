import { Injectable } from '@angular/core';
import {CoffeeShop} from "./coffee-shop";
import { Observable, of, BehaviorSubject } from 'rxjs';

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

  public searchCoordinates$: BehaviorSubject<[number, number]>;

  selectedCoffeeShop$:BehaviorSubject<number>;
  selectedCoffee$:BehaviorSubject<number>;
  CoffeeShops$:BehaviorSubject<CoffeeShop[]>;

  reviewText: string = "Όπως μου είπαν στο service center , το τηλέφωνο σας με τις κλείσεις και με τα μηνύματα δεν έχει πρόβλημα, τα υπόλοιπα δεν τους νοιάζει, με τα από 3 φορές που προσπαθανε...να το φταίξουν, όπως καταλάβατε έχει προβλιματα με τις εφαρμογές όπως viber, Facebook, και γενικά έχει κολλήματα, οταν παίρνεις τηλέφωνο με 600€ , δεν το περιμένεις, και πάλι όπως μας ήταν στο service , δεν είναι εγγύηση η τιμή";

  constructor() 
  {
    this.mockData();
    this.selectedCoffeeShop$=new BehaviorSubject<number>(undefined);
    this.selectedCoffee$ = new BehaviorSubject<number>(undefined);
    this.selectCoffeeShop(undefined);
    this.selectCoffee(undefined);
    this.CoffeeShops$= new BehaviorSubject<CoffeeShop[]>(undefined);

    this.searchCoordinates$ = new BehaviorSubject<[number, number]>(undefined);
  };

  mockData()
  {
    let date = new Date();
    this.reviews.push(new Review(1, this.reviewText, 1.5, 214, "guruOfNet", date, 987, 321));
    this.reviews.push(new Review(1, this.reviewText, 1.5, 214, "guruOfNet", date, 987, 321));
    this.reviews.push(new Review(1, this.reviewText, 1.5, 214, "guruOfNet", date, 987, 321));
    this.reviews.push(new Review(1, this.reviewText, 1.5, 214, "guruOfNet", date, 987, 321));

    this.coffee = new Coffee(1, "Freddo Cappuccino latte mocha maciato", "Αποκαλύπτει το ιταλικό ταπεραμέντο του από το πρώτο δευτερόλεπτο. Πλούσια γεύση καφέ καπουτσίνο, με πυκνό ατμό, φτιαγμένο για τους εραστές της απόλαυσης.", "../assets/cap.jpg", 2.80, 4.7, 14, this.reviews);

    var i: number;
    for(i = 0; i < 5; i++)
    {
      this.coffees.push(this.coffee);
    }
  
    this.coffeeShops[0] = new CoffeeShop(1, "Mikel", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikelcoffee.com", "1234567890",37.976703, 23.726184, this.coffees);
    this.coffeeShops[1] = new CoffeeShop(2, "CoffeeShop2", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikelcoffee.com", "1234567890", 37.976607, 23.726367,this.coffees);
    this.coffeeShops[2] = new CoffeeShop(3, "CoffeeShop3", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikelcoffee.com", "1234567890",37.977021, 23.727494, this.coffees);
  }

  getCoffeeShop(id: number): Observable<CoffeeShop>
  {
    this.coffeeShop= this.coffeeShops.find(cs => cs.id == id);
    return of(this.coffeeShop);
  }

  getCoffeeShops()
  {
    //this.updateCoffeeShops(undefined,undefined);
    return this.CoffeeShops$;
  }

  updateCoffeeShops(lat:number,lng:number)
  {
    this.CoffeeShops$.next(this.coffeeShops);
  }

  getCoffee(id: number): Observable<Coffee>
  {
    this.coffee = this.coffees.find(cs => cs.id == id);
    return of(this.coffee);
  }

  selectCoffeeShop(selectedIndex:number)
  {
    this.selectedCoffeeShop$.next(selectedIndex);
  }

  getSelectedCoffeeShop()
  {
    return this.selectedCoffeeShop$;
  }

  selectCoffee(id: number)
  {
    this.selectedCoffee$.next(id);
  }

  getSelectedCoffee()
  {
    return this.selectedCoffee$;
  }

  getMarkers(coffeeShops:CoffeeShop[])
  {
    return coffeeShops.map((cs):[number,number] => [cs.lat,cs.lng]);
    
  }

  setSearchLocation(lat:number,lng:number)
  {
    this.searchCoordinates$.next([lat, lng]);
  }

  getSearchLocation()
  {
    return this.searchCoordinates$;
  }
}
