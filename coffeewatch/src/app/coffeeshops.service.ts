import { Injectable } from '@angular/core';
import {CoffeeShop} from "./coffee-shop";
import { Observable, of, BehaviorSubject } from 'rxjs';
import {map, flatMap} from 'rxjs/operators';

import {Coffee} from "./coffee";
import {Review} from "./review";
import { UserService } from './user.service';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';

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

  baseAPIURL = 'http://localhost:8765/';

  reviewText: string = "Όπως μου είπαν στο service center , το τηλέφωνο σας με τις κλείσεις και με τα μηνύματα δεν έχει πρόβλημα, τα υπόλοιπα δεν τους νοιάζει, με τα από 3 φορές που προσπαθανε...να το φταίξουν, όπως καταλάβατε έχει προβλιματα με τις εφαρμογές όπως viber, Facebook, και γενικά έχει κολλήματα, οταν παίρνεις τηλέφωνο με 600€ , δεν το περιμένεις, και πάλι όπως μας ήταν στο service , δεν είναι εγγύηση η τιμή";

  constructor(private http: HttpClient, private userService: UserService) 
  {
    //this.userService.login("user1@email.com", "AUTHENTICATED");

    this.selectedCoffeeShop$=new BehaviorSubject<number>(undefined);
    this.selectedCoffee$ = new BehaviorSubject<number>(undefined);
    this.selectCoffeeShop(undefined);
    this.selectCoffee(undefined);
    this.CoffeeShops$= new BehaviorSubject<CoffeeShop[]>(undefined);

    this.searchCoordinates$ = new BehaviorSubject<[number, number]>(undefined);
  };

  getCoffeeShop(csid: number): Observable<CoffeeShop>
  {
    if (csid != undefined)
    {
      let headerCoffees= {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        ,params: new HttpParams().set("shopid", csid.toString())
      };

      let headerShop= {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        ,params: new HttpParams().set("id", csid.toString())
      };

      return this.http.get<Coffee[]>(this.baseAPIURL + 'products', headerCoffees).pipe(flatMap(coffees => 
        {
          
          return this.http.get<CoffeeShop[]>(this.baseAPIURL + 'shops',headerShop)
          .pipe(map( coffeeshops => 
            {
              coffeeshops[0].coffees = coffees;
              return coffeeshops[0];
          }))

      }));
    }
    return of(undefined);
  }

  getCoffeeShops()
  {
    //this.updateCoffeeShops(undefined,undefined);
    return this.CoffeeShops$;
  }

  updateCoffeeShops(lat:number,lng:number)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    let counter = 0;
    this.http.get<CoffeeShop[]>(this.baseAPIURL + 'shops', httpOptions).subscribe( coffeeShops =>
      {
        this.coffeeShops = coffeeShops;
        this.coffeeShops.forEach(coffeeShop => 
          {
          const params = new HttpParams().set("shopid", coffeeShop.id.toString());
            const httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params };
            this.http.get<Coffee[]>(this.baseAPIURL + 'products', httpOptions1).subscribe(coffees =>
              {
                coffeeShop.coffees = coffees;
                counter++;
                if (counter == coffeeShops.length) this.CoffeeShops$.next(this.coffeeShops);
              });
          });
      });
  }

  getCoffee(id: number): Observable<Coffee>
  {
    if(id !== undefined)
    {
      const params = new HttpParams().set("id", id.toString());
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: params };
      return this.http.get<Coffee[]>(this.baseAPIURL + 'products', httpOptions).pipe(map(coffees => coffees[0]));
    }
    else return of(undefined);
  }

  getCoffeeDescription(id: number)
  {
    if (id !== undefined) 
    {
      const params = new HttpParams().set("id", id.toString());
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: params };
      return this.http.get<Coffee[]>(this.baseAPIURL + 'products', httpOptions).pipe(map(coffees => coffees[0].description));
    }
    else return of(undefined);
  }

  getCoffeeReviews(id: number)
  {
    if (id !== undefined) 
    {
      const params = new HttpParams().set("coffeeid", id.toString());
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: params };
      return this.http.get<Review[]>(this.baseAPIURL + 'reviews', httpOptions);
    }
    else return of(undefined);
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
    return coffeeShops.map((cs): [number, number,number] => [cs.id, cs.lat,cs.lng]);
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
