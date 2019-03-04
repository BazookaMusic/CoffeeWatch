import { Component, OnInit } from '@angular/core';
import { CoffeeshopsService } from '../coffeeshops.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CoffeeShop } from '../coffee-shop';
import { transition, trigger, state, animate, style } from '@angular/animations';

@Component({
  selector: 'app-search-coffee-shop',
  templateUrl: './search-coffee-shop.component.html',
  styleUrls: ['./search-coffee-shop.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(400)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({ opacity: 0 })))
    ]),
    trigger('fastFade', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(400)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(400, style({ opacity: 0 })))
    ]),
  ]
})

export class SearchCoffeeShopComponent implements OnInit
{
  centerlat: number;
  centerlng: number;
  zoomLevel: number;
  shoplat: number;
  shoplng: number;

  searchGroup: FormGroup;
  filteredCoffeeShops: CoffeeShop[] = [];
  selectedCoffeeShop: number;

  constructor(private coffeeShopsService: CoffeeshopsService) { }

  ngOnInit()
  {
    this.shoplat = undefined;
    this.shoplng = undefined;
    this.zoomLevel = 13;
    this.centerlat = 37.982038;
    this.centerlng = 23.730271;

    this.searchGroup = new FormGroup({
      searchCoffeeShops: new FormControl('', [Validators.minLength(0)])
    });

    this.searchGroup.controls.searchCoffeeShops.valueChanges.subscribe(value => {
      if (value.length === 0)
      {
        this.filteredCoffeeShops = [];
      }
      else
      {
        this.coffeeShopsService.getFilteredCoffeeShops(value).subscribe(coffeeShops =>
          {
            this.filteredCoffeeShops = coffeeShops;
            this.refresh();
          });
      }
    });
  }

  refresh()
  {
    this.selectedCoffeeShop = undefined;

    this.shoplat = undefined;
    this.shoplng = undefined;
    this.zoomMap(false);
  }

  centerMap(lat: number, lng: number) {
    this.centerlat = 0;
    this.centerlng = 0;
    setTimeout(() => {
      this.centerlat = lat;
      this.centerlng = lng;
    }, 50);
  }

  zoomMap(zoom: boolean) {
    this.zoomLevel = 0;
    setTimeout(() => {
      if(zoom) this.zoomLevel = 18;
      else this.zoomLevel = 13;
    }, 50);
  }

  onClickCoffeeShop(coffeeShop: CoffeeShop)
  {
    if (this.selectedCoffeeShop !== undefined && coffeeShop.id === this.selectedCoffeeShop)
    {
      this.selectedCoffeeShop = undefined;

      this.shoplat = undefined;
      this.shoplng = undefined;
      this.zoomMap(false);
    }
    else
    {
      this.selectedCoffeeShop = coffeeShop.id;

      this.shoplat = coffeeShop.lat;
      this.shoplng = coffeeShop.lng;
      this.centerMap(coffeeShop.lat, coffeeShop.lng);
      this.zoomMap(true);
    }
  }

  trackByFn(index: number, item: CoffeeShop): number {
    return item.id;
  }
}
