import { Injectable } from '@angular/core';
import {CoffeeShop, api_coffeeShop} from './coffee-shop';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {map, flatMap, reduce, catchError, tap} from 'rxjs/operators';

import {Coffee, APICoffee} from './coffee';
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
  coffeePrices: {[id: number]: number} = {};

  coffee: Coffee;
  reviews: Review[] = [];

  userLocationRequested: boolean;

  priceTiers: number[] = [];

  public searchLat: number;
  public searchLng: number;

  // observables
  searchCoordinates$: BehaviorSubject<[number, number]>;
  selectedCoffeeShop$: BehaviorSubject<number>;
  selectedCoffee$: BehaviorSubject<number>;
  CoffeeShops$: BehaviorSubject<CoffeeShop[]>;
  baseAPIURL = 'http://localhost:8765/observatory/api/';
  priceChange$: BehaviorSubject<boolean>;
  shopChange$: BehaviorSubject<boolean>;
  reviewChange$: BehaviorSubject<number>;

  filters: FilterObject;


  constructor(private http: HttpClient, private userService: UserService) {

    this.selectedCoffeeShop$ = new BehaviorSubject<number>(undefined);
    this.selectedCoffee$ = new BehaviorSubject<number>(undefined);
    this.selectCoffeeShop(undefined);
    this.selectCoffee(undefined);
    this.CoffeeShops$ = new BehaviorSubject<CoffeeShop[]>(undefined);

    this.searchCoordinates$ = new BehaviorSubject<[number, number]>(undefined);
    this.priceChange$ = new BehaviorSubject<boolean>(false);
    this.shopChange$ = new BehaviorSubject<boolean>(false);
    this.reviewChange$ = new BehaviorSubject<number>(undefined);
    this.filters = defaultFilters;
    this.searchCoordinates$.subscribe(coords => {
      if (coords !== undefined) {this.searchLat = coords[0]; this.searchLng = coords[1]; }
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

  submitCoffeeShop(cs: api_coffeeShop) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     'X-OBSERVATORY-AUTH': this.userService.tokenGet()});
    return this.http.post<api_coffeeShop>(this.baseAPIURL + 'shops', cs as api_coffeeShop, {'headers': headers} );
  }

  modifyCoffeeShop(cs: api_coffeeShop) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     'X-OBSERVATORY-AUTH': this.userService.tokenGet()});


    return this.http.put<api_coffeeShop>(this.baseAPIURL + 'shops/' + cs.id.toString(),
    cs as api_coffeeShop, {'headers': headers} );
  }

  getCoffeeShops() {
    // this.updateCoffeeShops(undefined,undefined);
    return this.CoffeeShops$;
  }

  updateCoffeeShops(lat: number , lng: number) {


    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const coffeeShopFilter = this.filterCoffeeShop(this.filters, lat, lng);
    const coffeeFilter = this.filterCoffee( this.filters);


    let counter = 0;
    this.getLatestPrices().subscribe(_  => {
        this.http.get<CoffeeShop[]>(this.baseAPIURL + 'shops', httpOptions).subscribe( coffeeShops => {
          this.coffeeShops = coffeeShops.filter(coffeeShopFilter);
          if (this.coffeeShops.length === 0) {
            this.CoffeeShops$.next(this.coffeeShops);
            return;
          }
          this.coffeeShopDict = {};
          this.coffeeShops.forEach(cs => this.coffeeShopDict[cs.id] = cs);
          this.coffeeShops.forEach(coffeeShop => {
            const params = new HttpParams().set('shopid', coffeeShop.id.toString()).set('category', this.filters.category);
              const httpOptions1 = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params };
              this.http.get<Coffee[]>(this.baseAPIURL + 'products', httpOptions1).pipe(flatMap(coffees => {
                  coffees.forEach(coffee => coffee.price = this.coffeePrices[coffee.id]);
                  coffees.forEach(coffee => this.getCoffeeReviews(coffee.id).subscribe(reviews => {
                      coffee.extraData.rating = +average(reviews.map(aReview => aReview.rating)).toFixed(2);
                    }
                   ));


                  return of(coffees);
                }))
                .subscribe(coffees => {
                  coffeeShop.coffees = coffees.filter(coffeeFilter);
                  counter++;
                  if (counter === this.coffeeShops.length) {
                    this.coffeeShops = this.coffeeShops.filter(cs => cs.coffees.length > 0); // throw away empty
                    this.priceTiers = this.getPricePartitions(this.coffeeShops);
                    const searchLat = this.searchLat;
                    const searchLng = this.searchLng;
                    switch (this.filters.sort) {
                      case 'price':
                        this.coffeeShops.sort(function (a,b)
                        {
                          return Math.min(...a.coffees.map(coffee => coffee.price)) -
                            Math.min(...b.coffees.map(coffee => coffee.price));
                        });
                        break;
                      case 'rating':
                        this.coffeeShops.sort(function (a,b)
                        {
                          return average(a.coffees.map(coffee => coffee.price)) -
                            average(b.coffees.map(coffee => coffee.price));
                        });
                      break;
                      case 'vfm':
                      this.coffeeShops.sort(function (a,b)
                        {
                          return average(a.coffees.map(coffee => coffee.price / coffee.extraData.rating)) -
                            average(b.coffees.map(coffee => coffee.price / coffee.extraData.rating));
                        });
                      break;
                      case 'dist':
                      this.coffeeShops.sort(function (a,b)
                        {
                          return distanceBetween(a.lat, a.lng, searchLat, searchLng) -
                          distanceBetween(b.lat, b.lng, searchLat, searchLng);
                        });
                      break;
                      default:
                        break;
                    }
                    this.CoffeeShops$.next(this.coffeeShops);
                  }
                });
            });
        });

      });
  }

  coffeeShopNeedsRefresh() {
    this.shopChange$.next(true);
  }

  // coffee

  deleteCoffee(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'X-OBSERVATORY-AUTH': this.userService.tokenGet()});
    return this.http.delete(this.baseAPIURL + 'products/' + id,  {headers: headers});
  }

  submitCoffee(coffeeIn: APICoffee, shopId: number, shopName: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'X-OBSERVATORY-AUTH': this.userService.tokenGet()});
    return this.http.post<APICoffee>(this.baseAPIURL + 'products', coffeeIn, {headers: headers}).pipe(flatMap(coffee => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const price: priceData = {productId: coffee.id, price: coffee.price, shopId: shopId,
          date: `${year}-${month}-${day}`, productName: coffee.name, shopName: shopName };
        return this.submitPrice(price);
      }));

  }

  editCoffee(coffeeIn: APICoffee, shopId: number, shopName: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'X-OBSERVATORY-AUTH': this.userService.tokenGet()});
    return this.http.put<APICoffee>(this.baseAPIURL + 'products/' + coffeeIn.id, coffeeIn, {headers: headers}).pipe(flatMap(coffee => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const price: priceData = {productId: coffee.id, price: coffee.price, shopId: shopId,
          date: `${year}-${month}-${day}`, productName: coffee.name, shopName: shopName };
        return this.submitPrice(price);
      }));
  }

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
      const params = new HttpParams().set('coffeeId', id.toString());
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: params };
      return this.http.get<Review[]>(this.baseAPIURL + 'reviews', httpOptions);
    } else { return of(undefined); }
  }

  reviewsNeedRefresh(productId: number)
  {
    this.reviewChange$.next(productId);
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

  setIsUserLocationRequested(requested: boolean) {
    this.userLocationRequested = requested;
  }

  isUserLocationRequested() {
    return this.userLocationRequested;
  }

  setSearchLocation(lat: number, lng: number) {
    this.searchCoordinates$.next([lat, lng]);
  }

  getSearchLocation() {
    return this.searchCoordinates$;
  }

  // reviews
  submitReview(rev: Review) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
     'X-OBSERVATORY-AUTH': this.userService.tokenGet()});
    return this.http.post<Review>(this.baseAPIURL + 'reviews', rev, {'headers': headers}).pipe(catchError(err => {
        console.log(err);
        return of(undefined);
      }
     ));
  }


  // filters
  setFilters(filters: FilterObject) {
    this.filters = filters;
    if (this.searchLat !== undefined) {
      this.updateCoffeeShops(this.searchLat, this.searchLng);
    }
  }

  getFilters() {
    return this.filters;
  }

  // reset filters
  resetFilters() {
    this.filters = defaultFilters;
  }

  // should a coffee be included?
  filterCoffee(filters: FilterObject) {
    return function(coffee: Coffee): boolean {
      return (coffee.price >= filters.minPrice )
            && (coffee.price <= filters.maxPrice) && (coffee.extraData.rating > filters.minRating);
    };
  }

  filterCoffeeShop(filters: FilterObject, searchLat: number, searchLng: number) {
    return function(coffeeShop: CoffeeShop): boolean {
      return distanceBetween(coffeeShop.lat, coffeeShop.lng, searchLat, searchLng) < filters.maxDist;
    };
  }








  // prices
  updateCoffeeShopPrices(coffeeShop: CoffeeShop) {
    const addedCoffees: {[id: number]: number} = {};
    const filters = this.filters;

    const params = new HttpParams()
    .set('shopId', coffeeShop.id.toString())
    .set('_sort', 'date')
    .set('_order', 'desc');

    const headerPrice = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      , params
    };

    return this.http.get<priceData[]>(this.baseAPIURL + '/prices', headerPrice).pipe(map( prices => {
        for (const price of prices) {
          if (addedCoffees[price.productId] === undefined) {
           addedCoffees[price.productId] = price.price;
          }
        }

        coffeeShop.coffees.forEach(coffee => coffee.price = addedCoffees[coffee.id]);
      }
    ));

  }
  getLatestPrices() {
    const addedCoffees: {[id: number]: number} = {};
    const filters = this.filters;

    const params = new HttpParams()
    .set('_sort', 'date')
    .set('_order', 'desc');

    const headerPrice = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      , params
    };

    return this.http.get<priceData[]>(this.baseAPIURL + '/prices', headerPrice).pipe(map( prices => {
        for (const price of prices) {
          if (addedCoffees[price.productId] === undefined) {
           addedCoffees[price.productId] = price.price;
          }
        }

        this.coffeePrices = addedCoffees;

        return of(true);
      }
    ));


  }

  priceNeedsRefresh() {
    this.priceChange$.next(true);
  }

  priceWatch() {
    return this.priceChange$;
  }
  getPrices(searchParams: priceSearch) {
    if (searchParams !== undefined) {
      const headerPrice = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        , params: new HttpParams()
        .set('productId',  stringed(searchParams.productId))
        .set('shopId', stringed(searchParams.shopId) )
      };

    return this.http.get<priceData[]>(this.baseAPIURL + 'prices', headerPrice).pipe(map(prices => prices.map(toPrice)));
    } else {
      return of(undefined);
    }
  }

  getLastPrice(id: number) {
    const headerPrice = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      , params: new HttpParams()
      .set('productId',  stringed(id))
      .set('_sort', 'date')
      .set('_order', 'desc')
      .set('_limit', '1')
    };
    return this.http.get<priceData[]>(this.baseAPIURL + 'prices', headerPrice)
    .pipe( map(prices => prices.map(toPrice)[0]))
    .pipe(catchError(err => of(undefined)));
  }

  submitPrice(price: priceData) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'X-OBSERVATORY-AUTH': this.userService.tokenGet()});

    return this.http.post<priceData>(this.baseAPIURL + 'prices', price, {headers: headers});
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
  if (values.length === 0) { return 0; }
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
    } else if (thresholds.length < 3) {
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



