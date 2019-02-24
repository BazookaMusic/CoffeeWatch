import { Injectable } from '@angular/core';
import {CoffeeShop} from './coffee-shop';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {map, flatMap, reduce} from 'rxjs/operators';

import {Coffee} from './coffee';
import {Review} from './review';
import { UserService } from './user.service';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { Marker, MarkerColors, LabelOptions } from './marker';
import { priceData, priceSearch, Price, toPrice } from './price';
import { FilterObject, defaultFilters } from './filters';
import { distanceBetween } from './helpers';

@Injectable({
  providedIn: 'root'
})
export class CoffeeshopsService {

  // cached data
  coffeeShops: CoffeeShop[] = [];
  coffeeShop: CoffeeShop;
  coffees: Coffee[] = [];
  coffeeShopDict: {[id: number]: CoffeeShop} = {};

  coffee: Coffee;
  reviews: Review[] = [];


  priceTiers: number[] = [];

  public searchLat: number;
  public searchLng: number;

  // observables
  searchCoordinates$: BehaviorSubject<[number, number]>;
  selectedCoffeeShop$: BehaviorSubject<number>;
  selectedCoffee$: BehaviorSubject<number>;
  CoffeeShops$: BehaviorSubject<CoffeeShop[]>;
  baseAPIURL = 'http://localhost:8765/observatory/api/';
 
  filters: FilterObject;


  constructor(private http: HttpClient, private userService: UserService) {

    this.selectedCoffeeShop$ = new BehaviorSubject<number>(undefined);
    this.selectedCoffee$ = new BehaviorSubject<number>(undefined);
    this.selectCoffeeShop(undefined);
    this.selectCoffee(undefined);
    this.CoffeeShops$ = new BehaviorSubject<CoffeeShop[]>(undefined);

    this.searchCoordinates$ = new BehaviorSubject<[number, number]>(undefined);
    this.filters = defaultFilters;
    this.searchCoordinates$.subscribe(coords => {
      if (coords !== undefined) {this.searchLat = coords[0]; this.searchLng = coords[1];}
    });
  }

  // coffeeShops

  getCoffeeShop(csid: number): Observable < CoffeeShop > {
    if (csid !== undefined) {
      const headerCoffees = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        , params: new HttpParams().set('shopid', csid.toString())
      };

      const headerShop = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        , params: new HttpParams().set('id', csid.toString())
      };

      return this.http.get<Coffee[]>(this.baseAPIURL + 'products', headerCoffees).pipe(flatMap(coffees => {

          return this.http.get<CoffeeShop[]>(this.baseAPIURL + 'shops', headerShop)
          .pipe(map( coffeeshops => {
              coffeeshops[0].coffees = coffees;
              return coffeeshops[0];
          }));

      }));
    }
    return of(undefined);
  }

  getCoffeeShops() {
    // this.updateCoffeeShops(undefined,undefined);
    return this.CoffeeShops$;
  }

  updateCoffeeShops(lat: number, lng: number) {
    console.log('trying to update');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const coffeeShopFilter = this.filterCoffeeShop(this.filters, lat, lng);
    const coffeeFilter = this.filterCoffee( this.filters);

    let counter = 0;
    this.http.get<CoffeeShop[]>(this.baseAPIURL + 'shops', httpOptions).subscribe( coffeeShops => {
        this.coffeeShops = coffeeShops.filter(coffeeShopFilter);
        if (this.coffeeShops.length === 0)
        {
          this.CoffeeShops$.next(this.coffeeShops);
          return;
        }
        this.coffeeShopDict = {};
        this.coffeeShops.forEach(cs => this.coffeeShopDict[cs.id] = cs);
        this.coffeeShops.forEach(coffeeShop => {
          const params = new HttpParams().set('shopid', coffeeShop.id.toString());
            const httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params };
            this.http.get<Coffee[]>(this.baseAPIURL + 'products', httpOptions1).subscribe(coffees => {
                coffeeShop.coffees = coffees.filter(coffeeFilter);
                counter++;
                if (counter === this.coffeeShops.length) 
                {
                  this.coffeeShops = this.coffeeShops.filter(cs => cs.coffees.length > 0); // throw away empty
                  this.priceTiers = this.getPricePartitions(this.coffeeShops);
                  this.CoffeeShops$.next(this.coffeeShops);

                }
              });
          });

      });
  }

  // coffee

  getCoffee(id: number): Observable<Coffee> {
    if (id !== undefined) {
      const params = new HttpParams().set('id', id.toString());
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: params };
      return this.http.get<Coffee[]>(this.baseAPIURL + 'products', httpOptions).pipe(map(coffees => coffees[0]));
    } else { return of(undefined); }
  }

  getCoffeeDescription(id: number) {
    if (id !== undefined) {
      const params = new HttpParams().set('id', id.toString());
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: params };
      return this.http.get<Coffee[]>(this.baseAPIURL + 'products', httpOptions).pipe(map(coffees => coffees[0].description));
    } else { return of(undefined); }
  }

  getCoffeeReviews(id: number) {
    if (id !== undefined) {
      const params = new HttpParams().set('coffeeid', id.toString());
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: params };
      return this.http.get<Review[]>(this.baseAPIURL + 'reviews', httpOptions);
    } else { return of(undefined); }
  }

  // selections

  selectCoffeeShop(selectedIndex: number) {
    this.selectedCoffeeShop$.next(selectedIndex);
  }

  getSelectedCoffeeShop() {
    return this.selectedCoffeeShop$;
  }

  selectCoffee(id: number) {
    this.selectedCoffee$.next(id);
  }

  getSelectedCoffee() {
    return this.selectedCoffee$;
  }

  // map functions

  getMarkers(coffeeShops: CoffeeShop[], icons = 'color') {
    const thresholds = this.priceTiers;
    const marker_icons = ['green_marker.png', 'yellow_marker.png', 'orange_marker.png', 'red_marker.png'];
    return coffeeShops.
    map((cs): Marker => {
         const selection = colorMap(this.priceTiers, average(cs.coffees.map(coffee => coffee.price)));
         const colorSel = MarkerColors[selection];
         const options: LabelOptions = {
            color: colorSel,
            fontSize: '14px',
            fontWeight: 'bold',
            text: cs.name
          };

        const iconPath = icons === 'color' ? '../assets/images/' + marker_icons[selection] : cs.iconPath;


        const marker = {
          id: cs.id,
          lat: cs.lat,
          lng: cs.lng,
          color: colorSel ,
          name: cs.name,
          icon: {url: iconPath, scaledSize: {height: 50, width: 60}},
          labelOptions: options
        };
        return marker;
    });
  }


  setSearchLocation(lat: number, lng: number) {
    this.searchCoordinates$.next([lat, lng]);
  }

  getSearchLocation() {
    return this.searchCoordinates$;
  }


  // filters
  setFilters(filters: FilterObject)
  {
    this.filters = filters;
    if (this.searchLat !== undefined)
    {
      this.updateCoffeeShops(this.searchLat, this.searchLng);
    }
  }

  getFilters()
  {
    return this.filters;
  }

  //reset filters
  resetFilters()
  {
    this.filters = defaultFilters;
  }

  // should a coffee be included?
  filterCoffee(filters: FilterObject)
  {
    return function(coffee: Coffee): boolean {
      return (coffee.category === filters.category) && (coffee.price >= filters.minPrice ) 
            && (coffee.price <= filters.maxPrice) && (coffee.extraData.rating > filters.minRating);
    };
  }

  filterCoffeeShop(filters: FilterObject, searchLat: number, searchLng: number)
  {
    return function(coffeeShop: CoffeeShop): boolean{
      return distanceBetween(coffeeShop.lat, coffeeShop.lng, searchLat, searchLng) < filters.maxDist;
    }
  }








  // prices
  getPrices(searchParams: priceSearch) {
    if (searchParams !== undefined) {
      const headerPrice = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        , params: new HttpParams()
        .set('productId',  stringed(searchParams.productId))
        .set('shopId', stringed(searchParams.shopId) )
      };

    return this.http.get<priceData[]>(this.baseAPIURL + 'prices', headerPrice).pipe(map(prices => prices.map(toPrice)));
    }
    else
    {
      return of(undefined);
    }
  }

  // misc
  getPricePartitions(coffeeShops) {
    const sortedCoffeePrices = coffeeShops.map(cs => cs.coffees)
    .map(coffees => average(coffees.map(coffee => coffee.price)))
    .sort();
    // 4 color thresholds to decide map marker color
    return colorThresholds(sortedCoffeePrices);


  }

}

export function average(values: number[]) {
  return values.reduce(function (a, b) { return +a + (+b); }, 0) / values.length;
}

function colorThresholds(arrSorted: number[]) {
  if (arrSorted.length === 0) {
    return undefined;
  }
  const divider = Math.floor(arrSorted.length / 4);
  if (arrSorted.length >= 4) {
    return [+arrSorted[divider - 1], +arrSorted[divider * 2 - 1], +arrSorted[divider * 3 - 1]  ];
  } else {
    return arrSorted;
  }
}

function colorMap(thresholds, value) {
    if (thresholds.length === 0) {
      return undefined;
    }
    else if (thresholds.length < 4)
    {
      return 0;
    }
    for (let index = thresholds.length - 1; index >= -1; index--) {
      if (index === -1 || value >= thresholds[index]) {
        return index + 1;
      }
    }
  }


function stringed(attr: any): string {
  if (attr === undefined) {
    return '';
  } else {
    return attr.toString();
  }
}



