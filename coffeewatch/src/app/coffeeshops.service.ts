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
    this.userService.login("user1@email.com", "AUTHENTICATED");

    //this.mockData();
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
    this.coffeeShops[3] = new CoffeeShop(4, "CoffeeShop4", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikelcoffee.com", "1234567890", 37.977021, 23.727494, this.coffees);
    this.coffeeShops[4] = new CoffeeShop(5, "CoffeeShop5", "../assets/mikel.png", "Αγίας Βαρβάρας 13 Υμηττός(Κορυφή)", "www.mikelcoffee.com", "1234567890", 37.977021, 23.727494, this.coffees);
  }

  getCoffeeShop(csid: number): Observable<CoffeeShop>
  {
    
    if (csid != undefined)
    {
      this.coffeeShop = this.coffeeShops.find(cs => cs.id === csid);

      
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
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    const params = new HttpParams().set("id", id.toString());
    return this.http.get<Coffee>(this.baseAPIURL + 'products', httpOptions);
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
